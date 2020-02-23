import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  addToCart,
  removeFromCart,
  clearCart,
  applyPromoCode,
  checkoutRequest,
  cartReset
} from '../redux/actions'
import { getSelectedProductsDetail, getSelectedProductsCnt, getPrices } from '../selectors'
import { list } from '../styles/components/List'
import { button } from '../styles/components/Button'
import styles from '../styles/pages/ProductDetail'

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promoCode: ''
    }
  }

  componentDidMount() {
    const { cnt, navigation } = this.props
    navigation.setParams({ cnt: cnt })
  }

  componentDidUpdate(prevProps) {
    const { cnt, navigation, checkoutStatus } = this.props
    if (cnt !== prevProps.cnt) {
      navigation.setParams({ cnt: cnt })
    }
    if (checkoutStatus && checkoutStatus !== prevProps.checkoutStatus) {
      const { cartReset } = this.props
      alert(checkoutStatus.msg)
      cartReset()
    }
  }

  handleCheckoutRequest = () => {
    const { checkoutRequest, selectedProductsDetail } = this.props
    return checkoutRequest(selectedProductsDetail.map((el) => ({ sku: el.sku, quantity: el.cnt })))
  }

  render() {
    const {
      selectedProductsDetail,
      addToCart,
      removeFromCart,
      clearCart,
      applyPromoCode,
      prices
    } = this.props
    return (
      <View>
        {selectedProductsDetail
          .filter((el) => el.cnt && el.cnt !== 0)
          .map((el) => (
            <View key={el.sku} style={list.row}>
              <View style={list.rowTitle}>
                <Text>{el.name}</Text>
              </View>
              <View style={list.rowContent}>
                <TouchableOpacity style={button.action} onPress={() => removeFromCart(el.sku)}>
                  <Text style={button.actionText}>-</Text>
                </TouchableOpacity>
                <Text>{el.cnt}</Text>
                <TouchableOpacity style={button.action} onPress={() => addToCart(el.sku)}>
                  <Text style={button.actionText}>+</Text>
                </TouchableOpacity>
                <Text>${el.price}</Text>
                <TouchableOpacity style={button.action} onPress={() => clearCart(el.sku)}>
                  <Text style={button.actionText}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Promo Code</Text>
          </View>
          <View style={[list.rowContent, styles.promoCode]}>
            <TextInput
              style={styles.promoCodeInput}
              onChangeText={(text) => this.setState({ promoCode: text })}
            />
            <TouchableOpacity
              style={styles.promoCodeButton}
              onPress={() => applyPromoCode(this.state.promoCode)}
            >
              <Text style={styles.promoCodeText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Sub Total:</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${prices.subTotal}</Text>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Promo Amount</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${prices.promoAmount}</Text>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Basket Total:</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${prices.basketTotal}</Text>
          </View>
        </View>
        <View style={styles.checkout}>
          <TouchableOpacity style={styles.checkoutButton} onPress={this.handleCheckoutRequest}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ProductDetail.propTypes = {
  navigation: PropTypes.object,
  selectedProductsDetail: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  clearCart: PropTypes.func,
  cnt: PropTypes.number,
  applyPromoCode: PropTypes.func,
  prices: PropTypes.object,
  checkoutRequest: PropTypes.func,
  cartReset: PropTypes.func,
  checkoutStatus: PropTypes.object
}

const mapStateToProps = (state) => ({
  selectedProductsDetail: getSelectedProductsDetail(state),
  cnt: getSelectedProductsCnt(state),
  prices: getPrices(state),
  checkoutStatus: state.cart.checkout
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      addToCart,
      removeFromCart,
      clearCart,
      applyPromoCode,
      checkoutRequest,
      cartReset
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
