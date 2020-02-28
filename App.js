import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, Text } from 'react-native'
import { Provider } from 'react-redux'
import ProductsList from './app/containers/ProductsList'
import ProductDetail from './app/containers/ProductDetail'
import store from './app/redux/store'

const styles = {
  headerRightButton: {
    marginRight: 20
  },
  headerRightButtonText: {
    color: 'green'
  },
  screenOptions: {
    headerTitleAlign: 'center'
  }
}

const Stack = createStackNavigator()

class App extends Component {
  staticOptions = ({ route, navigation: { navigate } }) => {
    const params = route.params || { cnt: 0 }
    return {
      headerRight: this.headerRight(params, navigate, 'ProductDetail')
    }
  }

  headerRight = (params, navigate, navigateTo) => () => {
    const handlePressEvent = () => navigate(navigateTo)
    return (
      <TouchableOpacity
        style={styles.headerRightButton}
        onPress={handlePressEvent}
      >
        <Text style={styles.headerRightButtonText}>Carts {params.cnt}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ProductsList"
            screenOptions={styles.screenOptions}
          >
            <Stack.Screen
              name="ProductsList"
              component={ProductsList}
              options={this.staticOptions}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={this.staticOptions}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
