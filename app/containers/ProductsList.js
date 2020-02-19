import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import { Provider, connect } from 'react-redux'

import store from '../redux/store'
import { bindActionCreators } from 'redux'
import { fetchProductsRequest } from '../redux/actions'
class ProductsList extends Component {
  static navigationOptions = {
    title: 'ProductsList',
    headerRight: () => <Text>Text</Text>
  }

  componentDidMount() {
    // this.props.fetchProductsRequest()
  }

  render() {
    return (
      <Provider store={store}>
        <Text>asdf</Text>
      </Provider>
    )
  }
}

ProductsList.propTypes = {
  fetchProductsRequest: PropTypes.func
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      fetchProductsRequest
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
