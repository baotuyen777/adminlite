import Services from './Services'
let entity = 'orders';
export const getAllOrder = (param, dispatch, state) => { 
  Services.get(
    entity + '?searchCriteria[pageSize]=2&searchCriteria[currentPage]='+param.currentPage,
    res => dispatch({ type: 'ORDER_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_ALL_FAIL', data: res }),
    err => console.log(err)
  )
}
export const deleteOrder = (id, dispatch, state) => {
  Services.delete(
    entity + id,
    res => dispatch({ type: 'ORDER_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_DELETE_FAIL', data: res }),
    err => console.log(err));
}
export const changeStatusOrder = (params, dispatch, state) => {
  Services.post(
    entity,
    params,
    res => dispatch({ type: 'ORDER_CHANGE_STATUS_SUCCESS', data: res }),
    res => dispatch({ type: 'ORDER_CHANGE_STATUS_FAIL', data: res }),
    err => console.log(err));
}
// export const updateOrder = (id, params, dispatch, state) => {
//   Services.put(
//     entity + id,
//     params,
//     res => dispatch({ type: 'ORDER_UPDATE_SUCCESS', data: res }),
//     res => dispatch({ type: 'ORDER_UPDATE_FAIL', data: res }),
//     err => console.log(err));
// }

// export const createOrder = (params, dispatch, state) => {
//   Services.post(
//     entity,
//     params,
//     res => dispatch({ type: 'ORDER_CREATE_SUCCESS', data: res }),
//     res => dispatch({ type: 'ORDER_CREATE_FAIL', data: res }),
//     err => console.log(err));
// }