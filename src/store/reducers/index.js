import { combineReducers } from 'redux';

import dialogReducer from './ui/dialog';
import loadingReducer from './ui/loading';
import authReducer from './auth';
import suppliersReducer from './suppliers';

export default combineReducers({
  ui: combineReducers({
    dialogState: dialogReducer,
    loadingState: loadingReducer
  }),
  authState: authReducer,
  suppliersState: suppliersReducer
});
