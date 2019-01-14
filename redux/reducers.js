import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

let result = (state = {}, action) => action;
export default combineReducers({
    auth: combineReducers({
        result
    }),
    product: combineReducers({
        result
    }),
    order: combineReducers({
        result
    }),
    user: combineReducers({
        result
    }),

    routing: routerReducer
})