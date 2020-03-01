import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import ProductsList from './app/containers/ProductsList'
import ProductDetail from './app/containers/ProductDetail'
import HeaderRight from './app/components/HeaderRight'
import store from './app/redux/store'

const styles = {
  screenOptions: {
    headerTitleAlign: 'center'
  }
}

const Stack = createStackNavigator()

class App extends Component {
  staticOptions = ({ route, navigation: { navigate } }) => {
    const params = route.params || { cnt: 0 }
    return {
      headerRight: () => (
        <HeaderRight
          params={params}
          navigate={navigate}
          navigateTo="ProductDetail"
        />
      )
    }
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
