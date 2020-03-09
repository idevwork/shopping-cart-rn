import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { listStyles } from '../styles/components/ListStyles'
import { buttonStyles } from '../styles/components/ButtonStyles'

class ProductsListItem extends Component {
  handleAddToCart = () => {
    const {
      product: { sku },
      addToCart
    } = this.props
    addToCart(sku)
  }

  render() {
    const {
      product: { sku, name, price },
      productsInCart
    } = this.props

    return (
      <View key={sku} style={listStyles.row}>
        <View>
          <Text>{name}</Text>
        </View>
        <View style={listStyles.rowContent}>
          <Text>
            ${price}
            {productsInCart &&
              productsInCart[sku] &&
              ` X ${productsInCart[sku]}`}
          </Text>
          <TouchableOpacity
            style={buttonStyles.action}
            onPress={this.handleAddToCart}
          >
            <Text style={buttonStyles.actionText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ProductsListItem.propTypes = {
  product: PropTypes.object,
  productsInCart: PropTypes.object,
  addToCart: PropTypes.func
}

export default ProductsListItem
