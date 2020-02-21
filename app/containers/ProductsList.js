import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import mock from '../mock'
import { list } from '../styles/components/list'
import { button } from '../styles/components/button'
import { fetchProductsRequest } from '../redux/actions'

class ProductsList extends Component {
  constructor(props) {
    super(props)
    this.state = { cnt: 0 }
  }

  // componentDidMount() {
  //   this.props.fetchProductsRequest()
  // }

  addToCart = () => {
    const newCnt = this.state.cnt + 1
    this.setState({ cnt: newCnt })
    this.props.navigation.setParams({ cnt: newCnt })
  }

  render() {
    return (
      <View>
        {mock.map((el) => (
          <View key={el.sku} style={list.row}>
            <View>
              <Text>{el.name}</Text>
            </View>
            <View style={list.rowContent}>
              <Text>${el.price}</Text>
              <TouchableOpacity style={button.action} onPress={this.addToCart}>
                <Text style={button.actionText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

ProductsList.propTypes = {
  navigation: PropTypes.object,
  fetchProductsRequest: PropTypes.object
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

// export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
export default ProductsList
