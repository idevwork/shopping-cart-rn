import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

export default class ProductsListItem extends Component {
  onAddToCart = () => {
    const { product, handleAddCart } = this.props
    handleAddCart(product.sku)
  }

  render() {
    const { product, productsInCart } = this.props
    return (
      <View key={product.sku} style={list.row}>
        <View>
          <Text>{product.name}</Text>
        </View>
        <View style={list.rowContent}>
          <Text>
            ${product.price}
            {Object.prototype.hasOwnProperty.call(
              productsInCart,
              product.sku
            ) && ` X ${productsInCart[product.sku]}`}
          </Text>
          <TouchableOpacity style={button.action} onPress={this.onAddToCart}>
            <Text style={button.actionText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ProductsListItem.propTypes = {
  product: PropTypes.object,
  productsInCart: PropTypes.object,
  handleAddCart: PropTypes.func
}
