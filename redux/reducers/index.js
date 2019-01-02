

import todosList from './todos/todosList'
import todosFilter from './todos/todosFilter'
import { login } from './auth';
import { listProduct } from './product';
import { listUser } from './user';
// import { listOrder } from './order';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({

    todos: combineReducers({
        todosList,
        todosFilter
    }),
    auth: combineReducers({
        login
    }),
    product: combineReducers({
        listProduct
    }),
    order: combineReducers({
        listOrder(state = {}, action) {
            return action;
        }
    }),
    user: combineReducers({
        listUser
    }),
    date: combineReducers({
        listDate(state = {}, action) {
            return action;
        }
    }),
    routing: routerReducer
})