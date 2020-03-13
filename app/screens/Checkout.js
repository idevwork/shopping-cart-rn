import React, { Component } from 'react'
import { Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import CheckoutProduct from '../components/CheckoutProduct'
import {
  addToCart,
  removeFromCart,
  clearFromCart,
  applyPromoCodeRequest,
  checkoutRequest,
  cartReset
} from '../redux/reducers/cart'
import { getCartProducts, getPrices } from '../selectors'
import { COLORS } from '../styles/colors'
import { commonStyles } from '../styles/common/commonStyles'

const styles = {
  checkout: {
    alignItems: 'center'
  },
  checkoutButton: {
    marginVertical: 10,
    padding: 10,
    borderColor: COLORS.green500,
    borderRadius: 3,
    borderWidth: 2,
    backgroundColor: COLORS.transparent,
    width: '70%'
  },
  checkoutButtonText: {
    color: COLORS.green500,
    textAlign: 'center'
  },
  promoCode: {
    flex: 1
  },
  promoCodeButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: COLORS.green500
  },
  promoCodeInput: {
    marginHorizontal: 10,
    paddingVertical: 3,
    borderColor: COLORS.gray500,
    borderWidth: 1,
    flex: 1,
    height: 30
  },
  promoCodeText: {
    color: COLORS.white
  }
}

class Checkout extends Component {
  state = {
    promoCode: ''
  }

  componentDidUpdate() {
    const { checkoutStatus, cartReset } = this.props
    if (has(checkoutStatus, 'msg') && !isEmpty(checkoutStatus.msg)) {
      cartReset()
    }
  }

  handleCheckoutRequest = () => {
    this.props.checkoutRequest()
  }

  handleAddToCart = (sku) => {
    this.props.addToCart(sku)
  }

  handleRemoveFromCart = (sku) => {
    this.props.removeFromCart(sku)
  }

  handleClearFromCart = (sku) => {
    this.props.clearFromCart(sku)
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
      <CheckoutProduct
        key={sku}
        product={item}
        removeFromCart={this.handleRemoveFromCart}
        addToCart={this.handleAddToCart}
        clearFromCart={this.handleClearFromCart}
      />
    )
  }

  renderKeyExtractor = (item) => `item-${item.sku}`

  render() {
    const { cartProducts, prices } = this.props
    const { subTotal, promoAmount, basketTotal } = prices
    return (
      <View>
        <FlatList
          data={cartProducts}
          renderItem={this.renderProductsDetailList}
          keyExtractor={this.renderKeyExtractor}
        />
        <View style={commonStyles.list.row}>
          <View style={commonStyles.list.rowTitle}>
            <Text>Promo Code</Text>
          </View>
          <View style={[commonStyles.list.rowContent, styles.promoCode]}>
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
        <View style={commonStyles.list.row}>
          <View style={commonStyles.list.rowTitle}>
            <Text>Sub Total:</Text>
          </View>
          <View style={commonStyles.list.rowContent}>
            <Text>${subTotal}</Text>
          </View>
        </View>
        <View style={commonStyles.list.row}>
          <View style={commonStyles.list.rowTitle}>
            <Text>Promo Amount</Text>
          </View>
          <View style={commonStyles.list.rowContent}>
            <Text>${promoAmount}</Text>
          </View>
        </View>
        <View style={commonStyles.list.row}>
          <View style={commonStyles.list.rowTitle}>
            <Text>Basket Total:</Text>
          </View>
          <View style={commonStyles.list.rowContent}>
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
