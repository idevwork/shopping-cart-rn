import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'

import { fetchProductsRequest, addToCart } from '../redux/actions'
import { getProductsQuantityInCart } from '../selectors'
import ProductsListItem from '../components/ProductsListItem'

class ProductsList extends Component {
  static navigationOptions = {
    title: 'Products'
  }

  componentDidMount() {
    const { fetchProductsRequest, quantity, navigation } = this.props
    fetchProductsRequest()
    navigation.setParams({ quantity })
  }

  componentDidUpdate(prevProps) {
    const { quantity, navigation } = this.props
    if (quantity !== prevProps.quantity) {
      navigation.setParams({ quantity })
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
  quantity: PropTypes.number
}

const mapStateToProps = (state) => ({
  products: state.product,
  productsInCart: state.cart.productsInCart,
  quantity: getProductsQuantityInCart(state)
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
