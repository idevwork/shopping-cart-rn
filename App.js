import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import ProductsList from './app/screens/ProductsList'
import Checkout from './app/screens/Checkout'
import RightNavButton from './app/components/RightNavButton'
import store from './app/redux/store'
import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))

const Stack = createStackNavigator()

const staticOptions = ({ navigation }) => {
  return {
    headerTitleAlign: 'center',
    // eslint-disable-next-line react/display-name
    headerRight: () => <RightNavButton navigation={navigation} />
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
          name="Checkout"
          component={Checkout}
          options={{ title: 'Checkout' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
)

export default App
