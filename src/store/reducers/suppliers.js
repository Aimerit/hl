import {
  GET_SUPPLIERS_REQUEST,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_FAILURE,
  CREATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_SUCCESS
} from '../types/suppliers';

function initState() {
  return {
    suppliers: [],
    requesting: false
  };
}

export default function (state = initState(), action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUPPLIERS_REQUEST:
      return {
        suppliers: [],
        requesting: true
      };

    case GET_SUPPLIERS_SUCCESS:
      return {
        suppliers: payload.suppliers,
        requesting: false
      };

    case GET_SUPPLIERS_FAILURE:
      return {
        ...state,
        requesting: false
      };

    case CREATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: [payload.supplier, ...state.suppliers]
      };

    case UPDATE_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: state.suppliers.map((supplier) => {
          return supplier.id === payload.supplier.id ? payload.supplier : supplier;
        })
      };

    case DELETE_SUPPLIER_SUCCESS:
      return {
        ...state,
        suppliers: state.suppliers.filter((supplier) => supplier.id !== payload.supplier.id)
      };

    default:
      return state;
  }
}
