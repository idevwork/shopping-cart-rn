import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { commonStyles } from '../styles/common/commonStyles'

const styles = {
  actionText: {
    marginLeft: 10
  }
}

class CheckoutProduct extends Component {
  handleAddToCart = () => {
    const { addToCart, product } = this.props
    const { sku } = product
    addToCart(sku)
  }

  handleRemoveFromCart = () => {
    const { removeFromCart, product } = this.props
    const { sku } = product
    removeFromCart(sku)
  }

  handleClearFromCart = () => {
    const { clearFromCart, product } = this.props
    const { sku } = product
    clearFromCart(sku)
  }

  render() {
    const { product } = this.props
    const { sku, name, quantity, price } = product
    return (
      <View key={sku} style={commonStyles.list.row}>
        <View style={commonStyles.list.rowTitle}>
          <Text>{name}</Text>
        </View>
        <View style={commonStyles.list.rowContent}>
          <TouchableOpacity
            style={commonStyles.button.action}
            onPress={this.handleRemoveFromCart}
          >
            <Text style={commonStyles.button.actionText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.actionText}>{quantity}</Text>
          <TouchableOpacity
            style={commonStyles.button.action}
            onPress={this.handleAddToCart}
          >
            <Text style={commonStyles.button.actionText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.actionText}>${price}</Text>
          <TouchableOpacity
            style={commonStyles.button.action}
            onPress={this.handleClearFromCart}
          >
            <Text style={commonStyles.button.actionText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CheckoutProduct.propTypes = {
  product: PropTypes.object,
  removeFromCart: PropTypes.func,
  addToCart: PropTypes.func,
  clearFromCart: PropTypes.func
}

export default CheckoutProduct
