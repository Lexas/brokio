import {combineReducers} from 'redux';
import operations from './operationsReducer';

const rootReducer = combineReducers({
  operations
});

export default rootReducer;
