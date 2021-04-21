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
  DELETE_SUPPLIER_FAILURE
} from '../types/suppliers';
import supplierService from '../services/suppliers';
import loadingActions from '../actions/ui/loading';
import { handleHttpErrorResponse } from '../../api';

function getSuppliers() {
  return (dispatch) => {
    dispatch({ type: GET_SUPPLIERS_REQUEST });

    supplierService
      .getSuppliers()
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
        notification.showSuccessNotification({ title: 'Supplier created', message });
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
        notification.showSuccessNotification({ title: 'Supplier updated', message });
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
        notification.showSuccessNotification({ title: 'Supplier deleted', message });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: DELETE_SUPPLIER_FAILURE, notification }));
  };
}

export default { getSuppliers, createSupplier, updateSupplier, deleteSupplier };
