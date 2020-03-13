import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProductsQuantityInCart } from '../selectors'

const styles = {
  rightNavButton: {
    marginRight: 20
  },
  rightNavButtonText: {
    color: 'green'
  }
}

class RightNavButton extends Component {
  handlePressEvent = () => {
    const { navigation } = this.props
    const { navigate } = navigation
    navigate('Checkout')
  }

  render() {
    const { quantity } = this.props
    return (
      <TouchableOpacity
        style={styles.rightNavButton}
        onPress={this.handlePressEvent}
      >
        <Text style={styles.rightNavButtonText}>Carts {quantity}</Text>
      </TouchableOpacity>
    )
  }
}

RightNavButton.propTypes = {
  navigation: PropTypes.object,
  quantity: PropTypes.number
}

const mapStateToProps = (state) => ({
  quantity: getProductsQuantityInCart(state)
})

export default connect(mapStateToProps)(RightNavButton)
