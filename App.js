import React from 'react'
// import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { Provider } from 'react-redux'
import ProductsList from './app/containers/ProductsList'
import ProductDetail from './app/containers/ProductDetail'
// import store from './app/redux/store'

// const MainNavigator = createStackNavigator(
//   {
//     ProductsList: {
//       screen: ProductsList
//     },
//     ProductDetail: { screen: ProductDetail }
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitleAlign: 'center'
//     },
//     initialRouteName: 'ProductsList'
//   }
// )

// const AppNavigator = createAppContainer(MainNavigator)
const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductsList">
        <Stack.Screen name="ProductsList" component={ProductsList} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <AppNavigator />
//       </Provider>
//     )
//   }
// }

// export default App
