import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import mock from '../mock'

const color = {
  border: '#aaa',
  buttonBgColor: '#444',
  buttonColor: '#fff'
}

const styles = StyleSheet.create({
  productsList: {},
  productsRow: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 15
  },
  productsRowButton: {
    alignItems: 'center',
    backgroundColor: color.buttonBgColor,
    borderRadius: 1000,
    height: 30,
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 30
  },
  productsRowButtonTxt: {
    color: color.buttonColor
  },
  productsRowInfo: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  productsRowName: {}
})

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { cnt: 0 }
    this.props.navigation.setParams({ cnt: 0 })
  }

  componentDidMount() {
    this.props.navigation.setParams({ cnt: 0 })
  }

  addToCart = () => {
    const newCnt = this.state.cnt + 1
    this.setState({ cnt: newCnt })
    this.props.navigation.setParams({ cnt: newCnt })
  }

  removeToCart = () => {
    const newCnt = this.state.cnt - 1
    if (newCnt < 0) return
    this.setState({ cnt: newCnt })
    this.props.navigation.setParams({ cnt: newCnt })
  }

  clearToCart = () => {
    const newCnt = 0
    this.setState({ cnt: newCnt })
    this.props.navigation.setParams({ cnt: newCnt })
  }

  render() {
    const sum = mock
      .filter((el) => el.cnt)
      .reduce((acc, cur) => {
        console.log('start')
        console.log('acc', acc)
        console.log('cur.cnt', cur.cnt)
        console.log('end')

        return acc + cur.cnt
      })
    console.log(sum)
    return (
      <View style={styles.productsList}>
        {mock
          .filter((el) => el.cnt && el.cnt !== 0)
          .map((el) => (
            <View key={el.sku} style={styles.productsRow}>
              <View style={styles.productsRowName}>
                <Text>{el.name}</Text>
              </View>
              <View style={styles.productsRowInfo}>
                <TouchableOpacity style={styles.productsRowButton} onPress={this.removeToCart}>
                  <Text style={styles.productsRowButtonTxt}>-</Text>
                </TouchableOpacity>
                <Text>{el.cnt}</Text>
                <TouchableOpacity style={styles.productsRowButton} onPress={this.addToCart}>
                  <Text style={styles.productsRowButtonTxt}>+</Text>
                </TouchableOpacity>
                <Text>${el.price}</Text>
                <TouchableOpacity style={styles.productsRowButton} onPress={this.clearToCart}>
                  <Text style={styles.productsRowButtonTxt}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        <View style={styles.productsRow}>
          <View style={styles.productsRowName}>
            <Text>Promo Code</Text>
          </View>
          <View style={styles.productsRowInfo}>
            <Text>Apply</Text>
          </View>
        </View>
        <View style={styles.productsRow}>
          <View style={styles.productsRowName}>
            <Text>Sub Total:</Text>
          </View>
          <View style={styles.productsRowInfo}>
            <Text>{sum}</Text>
          </View>
        </View>
        <View style={styles.productsRow}>
          <View style={styles.productsRowName}>
            <Text>Promo Amount</Text>
          </View>
          <View style={styles.productsRowInfo}>
            <Text>Apply</Text>
          </View>
        </View>
        <View style={styles.productsRow}>
          <View style={styles.productsRowName}>
            <Text>Basket Total:</Text>
          </View>
          <View style={styles.productsRowInfo}>
            <Text>Apply</Text>
          </View>
        </View>
      </View>
    )
  }
}

ProductDetail.propTypes = {
  navigation: PropTypes.object
}

export default ProductDetail
