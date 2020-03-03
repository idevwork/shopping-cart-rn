import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

const ProductsListItem = ({
  product: { sku, name, price },
  productsInCart,
  handleAddCart
}) => {
  const onAddToCart = () => {
    handleAddCart(sku)
  }

  return (
    <View key={sku} style={list.row}>
      <View>
        <Text>{name}</Text>
      </View>
      <View style={list.rowContent}>
        <Text>
          ${price}
          {Object.prototype.hasOwnProperty.call(productsInCart, sku) &&
            ` X ${productsInCart[sku]}`}
        </Text>
        <TouchableOpacity style={button.action} onPress={onAddToCart}>
          <Text style={button.actionText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object,
  productsInCart: PropTypes.object,
  handleAddCart: PropTypes.func
}

export default ProductsListItem
