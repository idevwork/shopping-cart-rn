const productActionTypes = {
  FETCH_PRODUCTS_REQUEST: 'PRODUCT/FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCEED: 'PRODUCT/FETCH_PRODUCTS_SUCCEED',
  FETCH_PRODUCTS_FAIL: 'PRODUCT/FETCH_PRODUCTS_FAIL'
}

export const fetchProductsRequest = () => ({
  type: productActionTypes.FETCH_PRODUCTS_REQUEST
})

export default productActionTypes
