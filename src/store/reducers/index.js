import { combineReducers } from 'redux';

import dialogReducer from './ui/dialog';
import loadingReducer from './ui/loading';
import authReducer from './auth';
import suppliersReducer from './suppliers';
import categoriesReducer from './categories';
import productsReducer from './products';

export default combineReducers({
  ui: combineReducers({
    dialogState: dialogReducer,
    loadingState: loadingReducer
  }),
  authState: authReducer,
  suppliersState: suppliersReducer,
  categoriesState: categoriesReducer,
  productsState: productsReducer
});
