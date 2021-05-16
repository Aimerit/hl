import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  GET_PRODUCTS_ANALYTICS_REQUEST,
  GET_PRODUCTS_ANALYTICS_SUCCESS,
  GET_PRODUCTS_ANALYTICS_FAILURE
} from '../types/products';
import productService from '../services/products';
import loadingActions from '../actions/ui/loading';
import { handleHttpErrorResponse } from '../../api';
import { productMessages } from '../../utils/messages';

function getProducts({ options = {} } = {}) {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    productService
      .getProducts(options)
      .then(({ data: { data } }) => {
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: { products: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_PRODUCTS_FAILURE, hideLoading: false }));
  };
}

function createProduct({ productData = {}, notification, onSuccess }) {
  return (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    dispatch(loadingActions.showLoading());

    productService
      .createProduct(productData)
      .then(({ data: { data, message } }) => {
        if (onSuccess) onSuccess();
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: { product: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: productMessages.PRODUCT_CREATED.FR, message });
        dispatch(getProductsAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: CREATE_PRODUCT_FAILURE, notification }));
  };
}

function updateProduct({ productId, productData, options, notification, onSuccess }) {
  return (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    dispatch(loadingActions.showLoading());

    productService
      .updateProduct(productId, productData, options)
      .then(({ data: { data, message } }) => {
        if (onSuccess) onSuccess();
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: { product: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: productMessages.PRODUCT_UPDATED.FR, message });
        dispatch(getProductsAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: UPDATE_PRODUCT_FAILURE, notification }));
  };
}

function deleteProduct({ productId, notification }) {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    dispatch(loadingActions.showLoading());

    productService
      .deleteProduct(productId)
      .then(({ data: { data, message } }) => {
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: { product: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: productMessages.PRODUCT_DELETED.FR, message });
        dispatch(getProductsAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: DELETE_PRODUCT_FAILURE, notification }));
  };
}

function searchProducts({ searchData = {} } = {}) {
  return (dispatch) => {
    dispatch({ type: SEARCH_PRODUCTS_REQUEST });

    productService
      .searchProducts(searchData)
      .then(({ data: { data } }) => {
        dispatch({ type: SEARCH_PRODUCTS_SUCCESS, payload: { products: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: SEARCH_PRODUCTS_FAILURE, hideLoading: false }));
  };
}

function getProductsAnalytics() {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_ANALYTICS_REQUEST });

    productService
      .getProductsAnalytics()
      .then(({ data: { data } }) => {
        dispatch({ type: GET_PRODUCTS_ANALYTICS_SUCCESS, payload: { productsAnalytics: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_PRODUCTS_ANALYTICS_FAILURE, hideLoading: false }));
  };
}

export default { getProducts, createProduct, updateProduct, deleteProduct, searchProducts, getProductsAnalytics };
