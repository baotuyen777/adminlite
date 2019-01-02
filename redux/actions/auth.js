import Services from './Services';
let entity = 'auth';
export const sendDataLogin = (username, password, dispatch, state) => {
  let url = "integration/admin/token";
  let param = {
    username,
    password,
  }
  Services.login(
    url,
    param,
    res => dispatch({ type: 'LOGIN_SUCCESS', data: res }),
    res => dispatch({ type: 'LOGIN_FAIL', data: res }),
    err => console.log(err));
}
export const doLogout = (dispatch, state) => {
  dispatch({ type: 'DO_LOGOUT' })
}
export const register = (params, dispatch, state) => {
  Services.post(
    entity + '/register',
    params,
    res => dispatch({ type: 'REGISTER_SUCCESS', data: res }),
    res => dispatch({ type: 'REGISTER_FAIL', data: res }),
    err => console.log(err));
}
export const resetPassword1 = (params, dispatch, state) => {
  Services.post(
    entity + '/resetPassword1',
    params,
    res => dispatch({ type: 'RESET_PASSWORD1_SUCCESS', data: res }),
    res => dispatch({ type: 'RESET_PASSWORD1_FAIL', data: res }),
    err => console.log(err));
}
export const resetPassword2 = (params, dispatch, state) => {
  Services.post(
    entity + '/resetPassword2',
    params,
    res => dispatch({ type: 'RESET_PASSWORD2_SUCCESS', data: res }),
    res => dispatch({ type: 'RESET_PASSWORD2_FAIL', data: res }),
    err => console.log(err));
}

