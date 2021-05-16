import {
  GET_SUPPLIERS_REQUEST,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_FAILURE,
  CREATE_SUPPLIER_REQUEST,
  CREATE_SUPPLIER_SUCCESS,
  CREATE_SUPPLIER_FAILURE,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAILURE,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAILURE,
  SEARCH_SUPPLIERS_REQUEST,
  SEARCH_SUPPLIERS_SUCCESS,
  SEARCH_SUPPLIERS_FAILURE,
  GET_SUPPLIERS_ANALYTICS_REQUEST,
  GET_SUPPLIERS_ANALYTICS_SUCCESS,
  GET_SUPPLIERS_ANALYTICS_FAILURE
} from '../types/suppliers';
import supplierService from '../services/suppliers';
import loadingActions from '../actions/ui/loading';
import { handleHttpErrorResponse } from '../../api';
import { supplierMessages } from '../../utils/messages';

function getSuppliers({ options = {} } = {}) {
  return (dispatch) => {
    dispatch({ type: GET_SUPPLIERS_REQUEST });

    supplierService
      .getSuppliers(options)
      .then(({ data: { data } }) => {
        dispatch({ type: GET_SUPPLIERS_SUCCESS, payload: { suppliers: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_SUPPLIERS_FAILURE, hideLoading: false }));
  };
}

function createSupplier({ supplierData = {}, notification, onSuccess }) {
  return (dispatch) => {
    dispatch({ type: CREATE_SUPPLIER_REQUEST });
    dispatch(loadingActions.showLoading());

    supplierService
      .createSupplier(supplierData)
      .then(({ data: { data, message } }) => {
        if (onSuccess) onSuccess();
        dispatch({ type: CREATE_SUPPLIER_SUCCESS, payload: { supplier: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: supplierMessages.SUPPLIER_CREATED.FR, message });
        dispatch(getSuppliersAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: CREATE_SUPPLIER_FAILURE, notification }));
  };
}

function updateSupplier({ supplierId, supplierData, notification, onSuccess }) {
  return (dispatch) => {
    dispatch({ type: UPDATE_SUPPLIER_REQUEST });
    dispatch(loadingActions.showLoading());

    supplierService
      .updateSupplier(supplierId, supplierData)
      .then(({ data: { data, message } }) => {
        if (onSuccess) onSuccess();
        dispatch({ type: UPDATE_SUPPLIER_SUCCESS, payload: { supplier: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: supplierMessages.SUPPLIER_UPDATED.FR, message });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: UPDATE_SUPPLIER_FAILURE, notification }));
  };
}

function deleteSupplier({ supplierId, notification }) {
  return (dispatch) => {
    dispatch({ type: DELETE_SUPPLIER_REQUEST });
    dispatch(loadingActions.showLoading());

    supplierService
      .deleteSupplier(supplierId)
      .then(({ data: { data, message } }) => {
        dispatch({ type: DELETE_SUPPLIER_SUCCESS, payload: { supplier: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: supplierMessages.SUPPLIER_DELETED.FR, message });
        dispatch(getSuppliersAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: DELETE_SUPPLIER_FAILURE, notification }));
  };
}

function searchSuppliers({ searchData = {} } = {}) {
  return (dispatch) => {
    dispatch({ type: SEARCH_SUPPLIERS_REQUEST });

    supplierService
      .searchSuppliers(searchData)
      .then(({ data: { data } }) => {
        dispatch({ type: SEARCH_SUPPLIERS_SUCCESS, payload: { suppliers: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: SEARCH_SUPPLIERS_FAILURE, hideLoading: false }));
  };
}

function getSuppliersAnalytics() {
  return (dispatch) => {
    dispatch({ type: GET_SUPPLIERS_ANALYTICS_REQUEST });

    supplierService
      .getSuppliersAnalytics()
      .then(({ data: { data } }) => {
        dispatch({ type: GET_SUPPLIERS_ANALYTICS_SUCCESS, payload: { suppliersAnalytics: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_SUPPLIERS_ANALYTICS_FAILURE, hideLoading: false }));
  };
}

export default { getSuppliers, createSupplier, updateSupplier, deleteSupplier, searchSuppliers, getSuppliersAnalytics };
