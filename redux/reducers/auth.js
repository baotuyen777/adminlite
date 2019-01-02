export  function login(state = {}, action) {
    // {data:[],loading='not login'}

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return action;
        case 'LOGIN_FAIL':
            return action;
        default:
            return false
    }
}