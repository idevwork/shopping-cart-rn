import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProductsQuantityInCart } from '../selectors'

const styles = {
  headerRightButton: {
    marginRight: 20
  },
  headerRightButtonText: {
    color: 'green'
  }
}

class HeaderRight extends Component {
  handlePressEvent = () => {
    const {
      navigation: { navigate }
    } = this.props
    navigate('Checkout')
  }

  render() {
    const { quantity } = this.props
    return (
      <TouchableOpacity
        style={styles.headerRightButton}
        onPress={this.handlePressEvent}
      >
        <Text style={styles.headerRightButtonText}>Carts {quantity}</Text>
      </TouchableOpacity>
    )
  }
}

HeaderRight.propTypes = {
  navigation: PropTypes.object,
  quantity: PropTypes.number
}

const mapStateToProps = (state) => ({
  quantity: getProductsQuantityInCart(state)
})

export default connect(mapStateToProps)(HeaderRight)
