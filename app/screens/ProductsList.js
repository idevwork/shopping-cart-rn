import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProductsListItem from '../components/ProductsListItem'
import { fetchProductsRequest } from '../redux/reducers/product'
import { addToCart } from '../redux/reducers/cart'

class ProductsList extends Component {
  componentDidMount() {
    const { fetchProductsRequest } = this.props
    fetchProductsRequest()
  }

  handleAddToCart = (sku) => {
    const { addToCart } = this.props
    addToCart(sku)
  }

  renderProductsList = ({ item }) => {
    const { productsInCart } = this.props
    const { sku } = item
    return (
      <ProductsListItem
        key={sku}
        productsInCart={productsInCart}
        product={item}
        addToCart={this.handleAddToCart}
      />
    )
  }

  render() {
    const { products } = this.props

    return (
      <View>
        <FlatList
          data={products}
          renderItem={this.renderProductsList}
          keyExtractor={(item) => `item-${item.sku}`}
        />
      </View>
    )
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
