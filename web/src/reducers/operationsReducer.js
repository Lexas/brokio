import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function operationsReducer(state = initialState.operations, action) {
  switch (action.type) {
    case  types.POST_OPERATION:
      return action.config;

    default:
      return state;
  }
}
