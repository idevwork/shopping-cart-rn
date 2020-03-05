import React from 'react'
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

const HeaderRight = ({ navigation: { navigate }, quantity }) => {
  const handlePressEvent = () => navigate('CheckoutProducts')
  return (
    <TouchableOpacity
      style={styles.headerRightButton}
      onPress={handlePressEvent}
    >
      <Text style={styles.headerRightButtonText}>Carts {quantity}</Text>
    </TouchableOpacity>
  )
}

HeaderRight.propTypes = {
  navigation: PropTypes.object,
  quantity: PropTypes.number
}

const mapStateToProps = (state) => ({
  quantity: getProductsQuantityInCart(state)
})

export default connect(mapStateToProps, null)(HeaderRight)
