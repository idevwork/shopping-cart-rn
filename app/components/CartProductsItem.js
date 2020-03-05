import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

const CartProductsItem = ({
  product: { sku, name, quantity, price },
  handleAddToCart,
  handleRemoveFromCart,
  handleClearFromCart
}) => {
  const onAddToCart = () => {
    handleAddToCart(sku)
  }

  const onRemoveFromCart = () => {
    handleRemoveFromCart(sku)
  }

  const onClearFromCart = () => {
    handleClearFromCart(sku)
  }

  return (
    <View key={sku} style={list.row}>
      <View style={list.rowTitle}>
        <Text>{name}</Text>
      </View>
      <View style={list.rowContent}>
        <TouchableOpacity style={button.action} onPress={onRemoveFromCart}>
          <Text style={button.actionText}>-</Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity style={button.action} onPress={onAddToCart}>
          <Text style={button.actionText}>+</Text>
        </TouchableOpacity>
        <Text>${price}</Text>
        <TouchableOpacity style={button.action} onPress={onClearFromCart}>
          <Text style={button.actionText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

CartProductsItem.propTypes = {
  product: PropTypes.object,
  handleRemoveFromCart: PropTypes.func,
  handleAddToCart: PropTypes.func,
  handleClearFromCart: PropTypes.func
}

export default CartProductsItem
