import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native'

import { fetchProductsRequest, addToCart } from '../redux/actions'
import { getProductsCntInCart } from '../selectors'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

class ProductsList extends Component {
  static navigationOptions = {
    title: 'Products'
  }

  componentDidMount() {
    const { fetchProductsRequest } = this.props
    fetchProductsRequest()
    const { cnt, navigation } = this.props
    navigation.setParams({ cnt: cnt })
  }

  componentDidUpdate(prevProps) {
    const { cnt, navigation } = this.props
    if (cnt !== prevProps.cnt) {
      navigation.setParams({ cnt: cnt })
    }
  }

  handleAddToCart = (sku) => () => {
    const { addToCart } = this.props
    addToCart(sku)
  }

  render() {
    const { products, productsInCart } = this.props

    return (
      <View>
        {products.map((el) => (
          <View key={el.sku} style={list.row}>
            <View>
              <Text>{el.name}</Text>
            </View>
            <View style={list.rowContent}>
              <Text>
                ${el.price}
                {Object.prototype.hasOwnProperty.call(productsInCart, el.sku) &&
                  ` X ${productsInCart[el.sku]}`}
              </Text>
              <TouchableOpacity style={button.action} onPress={this.handleAddToCart(el.sku)}>
                <Text style={button.actionText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

ProductsList.propTypes = {
  navigation: PropTypes.object,
  fetchProductsRequest: PropTypes.func,
  addToCart: PropTypes.func,
  products: PropTypes.array,
  productsInCart: PropTypes.object,
  cnt: PropTypes.number
}

const mapStateToProps = (state) => ({
  products: state.product,
  productsInCart: state.cart.productsInCart,
  cnt: getProductsCntInCart(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      fetchProductsRequest,
      addToCart
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
