import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { listStyles } from '../styles/components/ListStyles'
import { buttonStyles } from '../styles/components/ButtonStyles'

class CartProductsItem extends Component {
  handleAddToCart() {
    const {
      addToCart,
      product: { sku }
    } = this.props
    addToCart(sku)
  }

  handleRemoveFromCart() {
    const {
      removeFromCart,
      product: { sku }
    } = this.props
    removeFromCart(sku)
  }

  handleClearFromCart() {
    const {
      clearFromCart,
      product: { sku }
    } = this.props
    clearFromCart(sku)
  }

  render() {
    const {
      product: { sku, name, quantity, price }
    } = this.props
    return (
      <View key={sku} style={listStyles.row}>
        <View style={listStyles.rowTitle}>
          <Text>{name}</Text>
        </View>
        <View style={listStyles.rowContent}>
          <TouchableOpacity
            style={buttonStyles.action}
            onPress={this.handleRemoveFromCart}
          >
            <Text style={buttonStyles.actionText}>-</Text>
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity
            style={buttonStyles.action}
            onPress={this.handleAddToCart}
          >
            <Text style={buttonStyles.actionText}>+</Text>
          </TouchableOpacity>
          <Text>${price}</Text>
          <TouchableOpacity
            style={buttonStyles.action}
            onPress={this.handleClearFromCart}
          >
            <Text style={buttonStyles.actionText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CartProductsItem.propTypes = {
  product: PropTypes.object,
  removeFromCart: PropTypes.func,
  addToCart: PropTypes.func,
  clearFromCart: PropTypes.func
}

export default CartProductsItem
