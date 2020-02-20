import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import mock from '../mock'
import { list } from '../styles/components/list'
import { button } from '../styles/components/button'
import { color } from '../styles/utils/variables'

const styles = StyleSheet.create({
  checkout: {
    alignItems: 'center'
  },
  checkoutButton: {
    backgroundColor: color.transparent,
    borderColor: color.green500,
    borderRadius: 3,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
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
    backgroundColor: color.green500,
    borderRadius: 5,
    padding: 5
  },
  promoCodeInput: {
    borderColor: color.gray500,
    borderWidth: 1,
    flex: 1,
    height: 30,
    marginHorizontal: 3,
    paddingVertical: 3
  },
  promoCodeText: {
    color: color.white
  }
})

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { cnt: 0, promoCode: '' }
  }

  updateCart = () => (mode) => {
    let newCnt = 0
    switch (mode) {
      case 'inc':
        newCnt = this.state.cnt + 1
        break
      case 'dec':
        newCnt = this.state.cnt - 1
        if (newCnt < 0) return
        break
      case 'clear':
        newCnt = 0
        break
      default:
        return
    }
    this.setState({ cnt: newCnt })
    this.props.navigation.setParams({ cnt: newCnt })
  }

  render() {
    const sum = mock
      .filter((el) => el.cnt)
      .reduce((acc, cur) => acc + cur.cnt * cur.price, 0)
      .toFixed(2)
    return (
      <View>
        {mock
          .filter((el) => el.cnt && el.cnt !== 0)
          .map((el) => (
            <View key={el.sku} style={list.row}>
              <View style={list.rowTitle}>
                <Text>{el.name}</Text>
              </View>
              <View style={list.rowContent}>
                <TouchableOpacity style={button.action} onPress={this.updateCart('dec')}>
                  <Text style={button.actionText}>-</Text>
                </TouchableOpacity>
                <Text>{el.cnt}</Text>
                <TouchableOpacity style={button.action} onPress={this.updateCart('inc')}>
                  <Text style={button.actionText}>+</Text>
                </TouchableOpacity>
                <Text>${el.price}</Text>
                <TouchableOpacity style={button.action} onPress={this.updateCart('clear')}>
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
            <TouchableOpacity style={styles.promoCodeButton}>
              <Text style={styles.promoCodeText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Sub Total:</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${sum}</Text>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Promo Amount</Text>
          </View>
          <View style={list.rowContent}>
            <Text>0</Text>
          </View>
        </View>
        <View style={list.row}>
          <View style={list.rowTitle}>
            <Text>Basket Total:</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${sum}</Text>
          </View>
        </View>
        <View style={styles.checkout}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

ProductDetail.propTypes = {
  navigation: PropTypes.object
}

export default ProductDetail
