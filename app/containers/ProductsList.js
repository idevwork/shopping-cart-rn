import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import mock from '../mock'
import { list } from '../styles/components/list'
import { button } from '../styles/components/button'

class ProductsList extends Component {
  constructor(props) {
    super(props)
    this.state = { cnt: 0 }
  }

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
  navigation: PropTypes.object
}

// const mapStateToProps = () => ({})

// const mapDispatchToProps = () => ({})

// export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)
export default ProductsList
