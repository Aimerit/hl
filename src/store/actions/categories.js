import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  SEARCH_CATEGORIES_REQUEST,
  SEARCH_CATEGORIES_SUCCESS,
  SEARCH_CATEGORIES_FAILURE,
  GET_CATEGORIES_ANALYTICS_REQUEST,
  GET_CATEGORIES_ANALYTICS_SUCCESS,
  GET_CATEGORIES_ANALYTICS_FAILURE
} from '../types/categories';
import categoryService from '../services/categories';
import loadingActions from '../actions/ui/loading';
import { handleHttpErrorResponse } from '../../api';
import { categoryMessages } from '../../utils/messages';
import categoryViewModel from '../../utils/view_models/category';

function getCategories({ options = {} } = {}) {
  return (dispatch) => {
    dispatch({ type: GET_CATEGORIES_REQUEST });

    categoryService
      .getCategories(options)
      .then(({ data: { data } }) => {
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: { categories: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_CATEGORIES_FAILURE, hideLoading: false }));
  };
}

function createCategory({ categoryData = {}, notification, onSuccess }) {
  return (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    dispatch(loadingActions.showLoading());

    categoryService
      .createCategory(categoryData)
      .then(({ data: { data, message } }) => {
        if (onSuccess) onSuccess();
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: { category: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: categoryMessages.CATEGORY_CREATED.FR, message });
        dispatch(getCategoriesAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: CREATE_CATEGORY_FAILURE, notification }));
  };
}

function updateCategory({ categoryId, categoryData, categoryOriginalData, options, notification, onSuccess }) {
  return (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    dispatch(loadingActions.showLoading());

    categoryService
      .updateCategory(categoryId, categoryData, options)
      .then(({ data: { data, message } }) => {
        if (onSuccess) onSuccess();
        const [parents, updatedParentMode] = [categoryViewModel.getUpdatedParents(categoryOriginalData, data), categoryViewModel.getUpdatedParentMode(categoryOriginalData, data)];
        dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: { category: data, parents, updatedParentMode } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: categoryMessages.CATEGORY_UPDATED.FR, message });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: UPDATE_CATEGORY_FAILURE, notification }));
  };
}

function deleteCategory({ categoryId, notification }) {
  return (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    dispatch(loadingActions.showLoading());

    categoryService
      .deleteCategory(categoryId)
      .then(({ data: { data, message } }) => {
        dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: { category: data } });
        dispatch(loadingActions.hideLoading());
        notification.showSuccessNotification({ title: categoryMessages.CATEGORY_DELETED.FR, message });
        dispatch(getCategoriesAnalytics());
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: DELETE_CATEGORY_FAILURE, notification }));
  };
}

function searchCategories({ searchData = {} } = {}) {
  return (dispatch) => {
    dispatch({ type: SEARCH_CATEGORIES_REQUEST });

    categoryService
      .searchCategories(searchData)
      .then(({ data: { data } }) => {
        dispatch({ type: SEARCH_CATEGORIES_SUCCESS, payload: { categories: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: SEARCH_CATEGORIES_FAILURE, hideLoading: false }));
  };
}

function getCategoriesAnalytics() {
  return (dispatch) => {
    dispatch({ type: GET_CATEGORIES_ANALYTICS_REQUEST });

    categoryService
      .getCategoriesAnalytics()
      .then(({ data: { data } }) => {
        dispatch({ type: GET_CATEGORIES_ANALYTICS_SUCCESS, payload: { categoriesAnalytics: data } });
      })
      .catch(handleHttpErrorResponse({ dispatch, errorType: GET_CATEGORIES_ANALYTICS_FAILURE, hideLoading: false }));
  };
}

export default { getCategories, createCategory, updateCategory, deleteCategory, searchCategories, getCategoriesAnalytics };
