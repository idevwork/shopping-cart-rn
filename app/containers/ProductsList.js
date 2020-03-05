import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'

import { fetchProductsRequest, addToCart } from '../redux/actions'
import ProductsListItem from '../components/ProductsListItem'

class ProductsList extends Component {
  static navigationOptions = {
    title: 'Products'
  }

  componentDidMount() {
    const { fetchProductsRequest } = this.props
    fetchProductsRequest()
  }

  handleAddToCart = (sku) => {
    const { addToCart } = this.props
    addToCart(sku)
  }

  renderProductsList = (el) => {
    const { productsInCart } = this.props
    const { sku } = el
    return (
      <ProductsListItem
        key={sku}
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
  fetchProductsRequest: PropTypes.func,
  addToCart: PropTypes.func,
  products: PropTypes.array,
  productsInCart: PropTypes.object
}

const mapStateToProps = (state) => ({
  products: state.product,
  productsInCart: state.cart.productsInCart
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
