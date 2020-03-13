import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProductsListItem from '../components/ProductsListItem'
import { fetchProductsRequest } from '../redux/reducers/product'
import { addToCart } from '../redux/reducers/cart'
import has from 'lodash/has'

class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProductsRequest()
  }

  handleAddToCart = (sku) => {
    this.props.addToCart(sku)
  }

  renderProductsList = ({ item }) => {
    const { productsInCart } = this.props
    const { sku } = item
    return (
      <ProductsListItem
        key={sku}
        products={item}
        productsInCart={productsInCart}
        addToCart={this.handleAddToCart}
      />
    )
  }

  renderKeyExtractor = (item) => `item-${item.sku}`

  render() {
    const { products, productsInCart } = this.props
    return (
      <View>
        <FlatList
          data={products}
          extraData={productsInCart}
          renderItem={this.renderProductsList}
          keyExtractor={this.renderKeyExtractor}
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

const mapDispatchToProps = {
  fetchProductsRequest,
  addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
