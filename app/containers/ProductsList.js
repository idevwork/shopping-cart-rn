import React, { Component } from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'

class ProductsList extends Component {
  static navigationOptions = {
    title: 'ProductsList',
    headerRight: () => <Text>Text</Text>
  }

  render() {
    return (
      <Provider>

      </Provider>
    )
  }
}

export default ProductsList
