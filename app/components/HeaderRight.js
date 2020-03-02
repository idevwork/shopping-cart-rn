import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

const styles = {
  headerRightButton: {
    marginRight: 20
  },
  headerRightButtonText: {
    color: 'green'
  }
}

const HeaderRight = ({ params, navigate, navigateTo }) => {
  const handlePressEvent = () => navigate(navigateTo)
  return (
    <TouchableOpacity
      style={styles.headerRightButton}
      onPress={handlePressEvent}
    >
      <Text style={styles.headerRightButtonText}>Carts {params.quantity}</Text>
    </TouchableOpacity>
  )
}

HeaderRight.propTypes = {
  params: PropTypes.object,
  navigate: PropTypes.func,
  navigateTo: PropTypes.string
}

export default HeaderRight
