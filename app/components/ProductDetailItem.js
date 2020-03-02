import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

const ProductDetailItem = ({
  product,
  handleAddToCart,
  handleRemoveFromCart,
  handleClearFromCart
}) => {
  const onAddToCart = () => {
    handleAddToCart(product.sku)
  }

  const onRemoveFromCart = () => {
    handleRemoveFromCart(product.sku)
  }

  const onClearFromCart = () => {
    handleClearFromCart(product.sku)
  }

  return (
    <View key={product.sku} style={list.row}>
      <View style={list.rowTitle}>
        <Text>{product.name}</Text>
      </View>
      <View style={list.rowContent}>
        <TouchableOpacity style={button.action} onPress={onRemoveFromCart}>
          <Text style={button.actionText}>-</Text>
        </TouchableOpacity>
        <Text>{product.quantity}</Text>
        <TouchableOpacity style={button.action} onPress={onAddToCart}>
          <Text style={button.actionText}>+</Text>
        </TouchableOpacity>
        <Text>${product.price}</Text>
        <TouchableOpacity style={button.action} onPress={onClearFromCart}>
          <Text style={button.actionText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

ProductDetailItem.propTypes = {
  product: PropTypes.object,
  handleRemoveFromCart: PropTypes.func,
  handleAddToCart: PropTypes.func,
  handleClearFromCart: PropTypes.func
}

export default ProductDetailItem
