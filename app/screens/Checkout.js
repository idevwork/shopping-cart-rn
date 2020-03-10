import React, { Component } from 'react'
import { Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CheckoutProducts from '../components/CheckoutProducts'
import {
  addToCart,
  removeFromCart,
  clearFromCart,
  applyPromoCodeRequest,
  checkoutRequest,
  cartReset
} from '../redux/reducers/cart'
import { getCartProducts, getPrices } from '../selectors'
import { color } from '../styles/common/variables'
import { listStyles } from '../styles/components/ListStyles'

const styles = {
  checkout: {
    alignItems: 'center'
  },
  checkoutButton: {
    marginVertical: 10,
    padding: 10,
    borderColor: color.green500,
    borderRadius: 3,
    borderWidth: 2,
    backgroundColor: color.transparent,
    width: '70%'
  },
  checkoutButtonText: {
    color: color.green500,
    textAlign: 'center'
  },
  promoCode: {
    flex: 1
  },
  promoCodeButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: color.green500
  },
  promoCodeInput: {
    marginHorizontal: 10,
    paddingVertical: 3,
    borderColor: color.gray500,
    borderWidth: 1,
    flex: 1,
    height: 30
  },
  promoCodeText: {
    color: color.white
  }
}

class Checkout extends Component {
  state = {
    promoCode: ''
  }

  componentDidUpdate() {
    const { checkoutStatus, cartReset } = this.props
    const succeededCheckout = !!(
      checkoutStatus.msg && Object.keys(checkoutStatus.msg).length !== 0
    )
    if (succeededCheckout) {
      cartReset()
    }
  }

  handleCheckoutRequest = () => {
    const { checkoutRequest } = this.props
    checkoutRequest()
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

  handleApplyPromoCodeRequest = () => {
    const { applyPromoCodeRequest } = this.props
    const { promoCode } = this.state
    applyPromoCodeRequest(promoCode)
  }

  handleTextEvent = (text) => {
    this.setState({ promoCode: text })
  }

  renderProductsDetailList = ({ item }) => {
    const { sku } = item
    return (
      <CheckoutProducts
        key={sku}
        product={item}
        removeFromCart={this.handleRemoveFromCart}
        addToCart={this.handleAddToCart}
        clearFromCart={this.handleClearFromCart}
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
        <FlatList
          data={cartProducts}
          renderItem={this.renderProductsDetailList}
          keyExtractor={(item) => `item-${item.sku}`}
        />
        <View style={listStyles.row}>
          <View style={listStyles.rowTitle}>
            <Text>Promo Code</Text>
          </View>
          <View style={[listStyles.rowContent, styles.promoCode]}>
            <TextInput
              style={styles.promoCodeInput}
              onChangeText={this.handleTextEvent}
            />
            <TouchableOpacity
              style={styles.promoCodeButton}
              onPress={this.handleApplyPromoCodeRequest}
            >
              <Text style={styles.promoCodeText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={listStyles.row}>
          <View style={listStyles.rowTitle}>
            <Text>Sub Total:</Text>
          </View>
          <View style={listStyles.rowContent}>
            <Text>${subTotal}</Text>
          </View>
        </View>
        <View style={listStyles.row}>
          <View style={listStyles.rowTitle}>
            <Text>Promo Amount</Text>
          </View>
          <View style={listStyles.rowContent}>
            <Text>${promoAmount}</Text>
          </View>
        </View>
        <View style={listStyles.row}>
          <View style={listStyles.rowTitle}>
            <Text>Basket Total:</Text>
          </View>
          <View style={listStyles.rowContent}>
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

Checkout.propTypes = {
  cartProducts: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  clearFromCart: PropTypes.func,
  applyPromoCodeRequest: PropTypes.func,
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

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
  clearFromCart,
  applyPromoCodeRequest,
  checkoutRequest,
  cartReset
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
