import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import ProductsList from './app/screens/ProductsList'
import CheckoutProducts from './app/screens/CheckoutProducts'
import HeaderRight from './app/components/HeaderRight'
import store from './app/redux/store'

const Stack = createStackNavigator()

const staticOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    // eslint-disable-next-line react/display-name
    headerRight: () => <HeaderRight navigation={navigation} />
  }
}

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductsList"
        screenOptions={staticOptions}
      >
        <Stack.Screen
          name="ProductsList"
          component={ProductsList}
          options={{ title: 'Products' }}
        />
        <Stack.Screen
          name="CheckoutProducts"
          component={CheckoutProducts}
          options={{ title: 'Checkout' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
)

export default App
