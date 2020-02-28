import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ProductDetailItem from '../components/ProductDetailItem'
import {
  addToCart,
  removeFromCart,
  clearFromCart,
  applyPromoCode,
  checkoutRequest,
  cartReset
} from '../redux/actions'
import {
  getProductsDetailInCart,
  getProductsCntInCart,
  getPrices
} from '../selectors'
import { list } from '../styles/components/List'
import styles from '../styles/pages/ProductDetail'

class ProductDetail extends Component {
  state = {
    promoCode: ''
  }

  componentDidMount() {
    const { cnt, navigation } = this.props
    navigation.setParams({ cnt })
  }

  componentDidUpdate(prevProps) {
    const { cnt, navigation, checkoutStatus, cartReset } = this.props
    if (cnt !== prevProps.cnt) {
      navigation.setParams({ cnt })
    }
    if (
      checkoutStatus &&
      Object.keys(checkoutStatus).length !== 0 &&
      checkoutStatus !== prevProps.checkoutStatus
    ) {
      cartReset()
    }
  }

  handleCheckoutRequest = () => {
    const { checkoutRequest, productsDetailInCart } = this.props
    return checkoutRequest(
      productsDetailInCart.map((el) => ({ sku: el.sku, quantity: el.cnt }))
    )
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

  filterProductsDetailList = (el) => el.cnt && el.cnt !== 0

  renderProductsDetailList = (product) => (
    <ProductDetailItem
      key={product.sku}
      product={product}
      handleRemoveFromCart={this.handleRemoveFromCart}
      handleAddToCart={this.handleAddToCart}
      handleClearFromCart={this.handleClearFromCart}
    />
  )

  render() {
    const { productsDetailInCart, prices } = this.props
    return (
      <View>
        {productsDetailInCart
          .filter(this.filterProductsDetailList)
          .map(this.renderProductsDetailList)}
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

ProductDetail.propTypes = {
  navigation: PropTypes.object,
  productsDetailInCart: PropTypes.array,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  clearFromCart: PropTypes.func,
  cnt: PropTypes.number,
  applyPromoCode: PropTypes.func,
  prices: PropTypes.object,
  checkoutRequest: PropTypes.func,
  cartReset: PropTypes.func,
  checkoutStatus: PropTypes.object
}

const mapStateToProps = (state) => ({
  productsDetailInCart: getProductsDetailInCart(state),
  cnt: getProductsCntInCart(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
