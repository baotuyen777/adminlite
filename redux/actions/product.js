import Services from './Services'
let entity = 'products/';
export const getAllProduct = (param, dispatch, state) => {
  Services.get(
    entity + '?searchCriteria[pageSize]=20&searchCriteria[currentPage]='+param.currentPage,
    res => dispatch({ type: 'PRODUCT_ALL_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_ALL_FAIL', data: res }),
    err => console.log(err));
}
export const getProduct = (param, dispatch, state) => {
  console.log(param,666)
  Services.get(
    entity +param.sku,
    res => dispatch({ type: 'PRODUCT_ONE_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_ONE_FAIL', data: res }),
    err => console.log(err));
}
export const deleteProduct = (id, dispatch, state) => {
  Services.delete(
    entity + id,
    res => dispatch({ type: 'PRODUCT_DELETE_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_DELETE_FAIL', data: res }),
    err => console.log(err));
}
export const createProduct = (params, dispatch, state) => {
  Services.post(
    entity,
    params,
    res => dispatch({ type: 'PRODUCT_CREATE_SUCCESS', data: res }),
    res => dispatch({ type: 'PRODUCT_CREATE_FAIL', data: res }),
    err => console.log(err));
}
