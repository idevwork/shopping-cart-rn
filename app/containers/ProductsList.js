import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import mock from '../mock'

const color = {
  border: '#aaa',
  buttonBgColor: '#444',
  buttonColor: '#fff'
}

const styles = StyleSheet.create({
  productsCnt: {
    paddingRight: 10
  },
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

class ProductsList extends Component {
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

  render() {
    return (
      <View style={styles.productsList}>
        {mock.map((el) => (
          <View key={el.sku} style={styles.productsRow}>
            <View style={styles.productsRowName}>
              <Text>{el.name}</Text>
            </View>
            <View style={styles.productsRowInfo}>
              <Text>${el.price}</Text>
              <TouchableOpacity style={styles.productsRowButton} onPress={this.addToCart}>
                <Text style={styles.productsRowButtonTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

ProductsList.propTypes = {
  navigation: PropTypes.object
}

// const mapStateToProps = () => ({})

// const mapDispatchToProps = () => ({})

// export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
export default ProductsList
