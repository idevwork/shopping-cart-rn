import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CheckoutProductsItem from '../components/CheckoutProductsItem'
import {
  addToCart,
  removeFromCart,
  clearFromCart,
  applyPromoCode,
  checkoutRequest,
  cartReset
} from '../redux/actions'
import { getCartProducts, getPrices } from '../selectors'
import { list } from '../styles/components/List'
import styles from '../styles/pages/CheckoutProducts'

class CheckoutProducts extends Component {
  state = {
    promoCode: ''
  }

  componentDidUpdate(prevProps) {
    const { checkoutStatus, cartReset } = this.props
    if (
      checkoutStatus &&
      checkoutStatus.msg &&
      checkoutStatus.msg !== prevProps.checkoutStatus.msg
    ) {
      cartReset()
    }
  }

  handleCheckoutRequest = () => {
    const { checkoutRequest } = this.props
    return checkoutRequest()
  }

  handleAddToCart = (sku) => {
    const { addToCart } = this.props
    addToCart(sku)
  }

  handleRemoveFromCart = (sku) => {
    const { removeFromCart } = this.props
    removeFromCart(sku)
  }

  handleClearFromCart = (sku) => {
    const { clearFromCart } = this.props
    clearFromCart(sku)
  }

  handleApplyPromoCode = () => {
    const { applyPromoCode } = this.props
    const { promoCode } = this.state
    applyPromoCode(promoCode)
  }

  handleTextEvent = (text) => {
    this.setState({ promoCode: text })
  }

  renderProductsDetailList = (product) => {
    const { sku } = product
    return (
      <CheckoutProductsItem
        key={sku}
        product={product}
        handleRemoveFromCart={this.handleRemoveFromCart}
        handleAddToCart={this.handleAddToCart}
        handleClearFromCart={this.handleClearFromCart}
      />
    )
  }

  render() {
    const {
      cartProducts,
      prices: { subTotal, promoAmount, basketTotal }
    } = this.props
    return (
      <View>
        {cartProducts.map(this.renderProductsDetailList)}
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Promo Code</Text>
          </View>
          <View style={[list.rowContent, styles.promoCode]}>
            <TextInput
              style={styles.promoCodeInput}
              onChangeText={this.handleTextEvent}
            />
            <TouchableOpacity
              style={styles.promoCodeButton}
              onPress={this.handleApplyPromoCode}
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
            <Text>${subTotal}</Text>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Promo Amount</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${promoAmount}</Text>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Basket Total:</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${basketTotal}</Text>
          </View>
        </View>
        <View style={styles.checkout}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={this.handleCheckoutRequest}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CheckoutProducts.propTypes = {
  cartProducts: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  clearFromCart: PropTypes.func,
  applyPromoCode: PropTypes.func,
  prices: PropTypes.object,
  checkoutRequest: PropTypes.func,
  cartReset: PropTypes.func,
  checkoutStatus: PropTypes.object
}

const mapStateToProps = (state) => ({
  cartProducts: getCartProducts(state),
  prices: getPrices(state),
  checkoutStatus: state.cart.checkout
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      addToCart,
      removeFromCart,
      clearFromCart,
      applyPromoCode,
      checkoutRequest,
      cartReset
    },
    dispatch
  )
})

const ConnectedCheckoutProducts = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutProducts)

export default ConnectedCheckoutProducts
