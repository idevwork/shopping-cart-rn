import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native'

import { fetchProductsRequest, addToCart } from '../redux/actions'
import { getSelectedProductsCnt } from '../selectors'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'

class ProductsList extends Component {
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

  render() {
    const { products, selectedProducts, addToCart } = this.props

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
                {Object.prototype.hasOwnProperty.call(selectedProducts, el.sku) &&
                  ` X ${selectedProducts[el.sku]}`}
              </Text>
              <TouchableOpacity style={button.action} onPress={() => addToCart(el.sku)}>
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
  selectedProducts: PropTypes.object,
  cnt: PropTypes.number
}

const mapStateToProps = (state) => ({
  products: state.product,
  selectedProducts: state.cart.selectedProducts,
  cnt: getSelectedProductsCnt(state)
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
