import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
  GET_PRODUCTS_ANALYTICS_SUCCESS
} from '../types/products';

function initState() {
  return {
    products: [],
    productsAnalytics: {},
    requesting: false
  };
}

export default function (state = initState(), action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        requesting: true
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        requesting: false
      };

    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        requesting: false
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [payload.product, ...state.products]
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map((product) => {
          return product.id === payload.product.id ? payload.product : product;
        })
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload.product.id)
      };

    case SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        requesting: true
      };

    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload.products,
        requesting: false
      };

    case SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        requesting: false
      };

    case GET_PRODUCTS_ANALYTICS_SUCCESS:
      return {
        ...state,
        productsAnalytics: payload.productsAnalytics
      };

    default:
      return state;
  }
}
