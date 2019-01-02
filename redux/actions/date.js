import Services from './Services'
let entity = 'extra/date/';
export const getAllDate = (param, dispatch, state) => {
  Services.get(
    entity,
    res => dispatch({ type: 'DATE_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'DATE_ALL_FAIL', data: res }),
    err => console.log(err));
}
export const deleteDate = (id, dispatch, state) => {
  Services.delete(
    entity + id,
    res => dispatch({ type: 'DATE_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'DATE_DELETE_FAIL', data: res }),
    err => console.log(err));
}
export const createDate = (params, dispatch, state) => {
  Services.post(
    entity,
    params,
    res => dispatch({ type: 'DATE_CREATE_SUCCESS', data: res }),
    res => dispatch({ type: 'DATE_CREATE_FAIL', data: res }),
    err => console.log(err));
}
export const changeStatusDate = (date, params, dispatch, state) => {
  console.log(date,params,66666666666);
  Services.put(
    entity + "updateStatus/" + date,
    params,
    res => dispatch({ type: 'DATE_CHANGE_STATUS_SUCCESS', data: res }),
    res => dispatch({ type: 'DATE_CHANGE_STATUS_FAIL', data: res }),
    err => console.log(err));
}
