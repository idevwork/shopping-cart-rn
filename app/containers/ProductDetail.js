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
    const cnt = mock
      .filter((el) => el.cnt && el.cnt !== 0)
      .reduce((acc, cur) => acc + cur.cnt || 0, 0)
    this.state = { cnt: cnt, promoCode: '' }
    this.props.navigation.setParams({ cnt: cnt })
  }

  updateCart = (sku, mode) => () => {
    let newCnt = this.state.cnt
    mock.map((el) => {
      if (el.sku === sku) {
        switch (mode) {
          case 'inc':
            el.cnt = el.cnt + 1
            newCnt = newCnt + 1
            break
          case 'dec':
            if (el.cnt === 0) return
            el.cnt = el.cnt - 1
            newCnt = newCnt - 1
            break
          case 'clear':
            newCnt -= el.cnt
            el.cnt = 0
            break
          default:
            break
        }
      }
    })
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
                <TouchableOpacity style={button.action} onPress={this.updateCart(el.sku, 'dec')}>
                  <Text style={button.actionText}>-</Text>
                </TouchableOpacity>
                <Text>{el.cnt}</Text>
                <TouchableOpacity style={button.action} onPress={this.updateCart(el.sku, 'inc')}>
                  <Text style={button.actionText}>+</Text>
                </TouchableOpacity>
                <Text>${el.price}</Text>
                <TouchableOpacity style={button.action} onPress={this.updateCart(el.sku, 'clear')}>
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
            <Text>Basket Totasl:</Text>
          </View>
          <View style={list.rowContent}>
            <Text>${sum}</Text>
          </View>
        </View>
        <View style={styles.checkout}>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkoust</Text>
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
