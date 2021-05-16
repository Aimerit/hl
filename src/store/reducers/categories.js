import { categoryUpdatedParentModes } from '../../utils/enums';
import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  SEARCH_CATEGORIES_REQUEST,
  SEARCH_CATEGORIES_SUCCESS,
  SEARCH_CATEGORIES_FAILURE,
  GET_CATEGORIES_ANALYTICS_SUCCESS
} from '../types/categories';

function initState() {
  return {
    categories: [],
    allCategories: [],
    categoriesAnalytics: {},
    requesting: false
  };
}

export default function (state = initState(), action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: [],
        allCategories: [],
        requesting: true
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
        allCategories: payload.categories,
        requesting: false
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        requesting: false
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: incrementParentSubCategoriesCount([payload.category, ...state.categories], payload.category.parent)
      };

    case UPDATE_CATEGORY_SUCCESS: {
      const { originalParent, updatedParent } = payload.parents;
      const strategies = {
        [categoryUpdatedParentModes.ADDED]: (categories) => incrementParentSubCategoriesCount(categories, updatedParent),
        [categoryUpdatedParentModes.REMOVED]: (categories) => decrementParentSubCategoriesCount(categories, originalParent),
        [categoryUpdatedParentModes.UPDATED]: (categories) => updateParentsSubCategoriesCount(categories, { originalParent, updatedParent }),
        [categoryUpdatedParentModes.NONE]: (categories) => categories
      };

      return {
        ...state,
        categories: strategies[payload.updatedParentMode](
          state.categories.map((category) => {
            return category.id === payload.category.id ? payload.category : category;
          })
        )
      };
    }

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: decrementParentSubCategoriesCount(
          state.categories.filter((category) => category.id !== payload.category.id),
          payload.category.parent
        )
      };

    case SEARCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: [],
        requesting: true
      };

    case SEARCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
        requesting: false
      };

    case SEARCH_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        requesting: false
      };

    case GET_CATEGORIES_ANALYTICS_SUCCESS:
      return {
        ...state,
        categoriesAnalytics: payload.categoriesAnalytics
      };

    default:
      return state;
  }
}

function updateParentsSubCategoriesCount(categories, parents) {
  const { originalParent, updatedParent } = parents;

  return incrementParentSubCategoriesCount(decrementParentSubCategoriesCount(categories, originalParent), updatedParent);
}

function incrementParentSubCategoriesCount(categories, parentCategory) {
  return categories.map((category) => {
    if (parentCategory.id === category.id) return { ...category, subCategoriesCount: category.subCategoriesCount + 1 };

    return category;
  });
}

function decrementParentSubCategoriesCount(categories, parentCategory) {
  return categories.map((category) => {
    if (parentCategory.id === category.id) return { ...category, subCategoriesCount: category.subCategoriesCount - 1 };

    return category;
  });
}
