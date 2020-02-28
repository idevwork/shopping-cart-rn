import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

export default class ProductDetailItem extends Component {
  onAddToCart = () => {
    this.props.handleAddToCart(this.props.product.sku)
  }

  onRemoveFromCart = () => {
    this.props.handleRemoveFromCart(this.props.product.sku)
  }

  onClearFromCart = () => {
    this.props.handleClearFromCart(this.props.product.sku)
  }

  render() {
    const { product } = this.props

    return (
      <View key={product.sku} style={list.row}>
        <View style={list.rowTitle}>
          <Text>{product.name}</Text>
        </View>
        <View style={list.rowContent}>
          <TouchableOpacity
            style={button.action}
            onPress={this.onRemoveFromCart}
          >
            <Text style={button.actionText}>-</Text>
          </TouchableOpacity>
          <Text>{product.cnt}</Text>
          <TouchableOpacity style={button.action} onPress={this.onAddToCart}>
            <Text style={button.actionText}>+</Text>
          </TouchableOpacity>
          <Text>${product.price}</Text>
          <TouchableOpacity
            style={button.action}
            onPress={this.onClearFromCart}
          >
            <Text style={button.actionText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ProductDetailItem.propTypes = {
  product: PropTypes.object,
  handleRemoveFromCart: PropTypes.func,
  handleAddToCart: PropTypes.func,
  handleClearFromCart: PropTypes.func
}
