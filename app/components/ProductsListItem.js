import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { commonStyles } from '../styles/common/commonStyles'
import has from 'lodash/has'

class ProductsListItem extends Component {
  handleAddToCart = () => {
    const { products, addToCart } = this.props
    const { sku } = products
    addToCart(sku)
  }

  render() {
    const { products, productsInCart } = this.props
    const { sku, name, price } = products
    return (
      <View key={sku} style={commonStyles.list.row}>
        <View>
          <Text>{name}</Text>
        </View>
        <View style={commonStyles.list.rowContent}>
          <Text>
            ${price}
            {has(productsInCart, sku) && ` X ${productsInCart[sku]}`}
          </Text>
          <TouchableOpacity
            style={commonStyles.button.action}
            onPress={this.handleAddToCart}
          >
            <Text style={commonStyles.button.actionText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ProductsListItem.propTypes = {
  products: PropTypes.object,
  productsInCart: PropTypes.object,
  addToCart: PropTypes.func
}

export default ProductsListItem
