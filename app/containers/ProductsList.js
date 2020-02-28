import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'

import { fetchProductsRequest, addToCart } from '../redux/actions'
import { getProductsCntInCart } from '../selectors'
import ProductsListItem from '../components/ProductsListItem'

class ProductsList extends Component {
  static navigationOptions = {
    title: 'Products'
  }

  componentDidMount() {
    const { fetchProductsRequest, cnt, navigation } = this.props
    fetchProductsRequest()
    navigation.setParams({ cnt: cnt })
  }

  componentDidUpdate(prevProps) {
    const { cnt, navigation } = this.props
    if (cnt !== prevProps.cnt) {
      navigation.setParams({ cnt: cnt })
    }
  }

  handleAddToCart = (sku) => {
    const { addToCart } = this.props
    addToCart(sku)
  }

  renderProductsList = (el) => {
    const { productsInCart } = this.props
    return (
      <ProductsListItem
        key={el.sku}
        productsInCart={productsInCart}
        product={el}
        handleAddCart={this.handleAddToCart}
      />
    )
  }

  render() {
    const { products } = this.props
    return <View>{products.map(this.renderProductsList)}</View>
  }
}

ProductsList.propTypes = {
  navigation: PropTypes.object,
  fetchProductsRequest: PropTypes.func,
  addToCart: PropTypes.func,
  products: PropTypes.array,
  productsInCart: PropTypes.object,
  cnt: PropTypes.number
}

const mapStateToProps = (state) => ({
  products: state.product,
  productsInCart: state.cart.productsInCart,
  cnt: getProductsCntInCart(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      fetchProductsRequest,
      addToCart
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
