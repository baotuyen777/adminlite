import Services from './Services'
let entity = 'user/';
export const getAllUser = (param, dispatch, state) => {
  Services.get(
    entity,
    res => dispatch({ type: 'USER_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'USER_ALL_FAIL', data: res }),
    err => console.log(err));
}
export const deleteUser = (id, dispatch, state) => {
  Services.delete(
    entity + id,
    res => dispatch({ type: 'USER_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'USER_DELETE_FAIL', data: res }),
    err => console.log(err));
}
export const addUser = (params, dispatch, state) => {
  Services.post(
    entity,
    params,
    res => dispatch({ type: 'USER_ADD_SUCCESS', data: res }),
    res => dispatch({ type: 'USER_ADD_FAIL', data: res }),
    err => console.log(err));
}
