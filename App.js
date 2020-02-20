import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity, Text } from 'react-native'
// import { Provider } from 'react-redux'
import ProductsList from './app/containers/ProductsList'
import ProductDetail from './app/containers/ProductDetail'
// import store from './app/redux/store'

const styles = {
  headerRightButton: {
    marginRight: 20
  },
  headerRightButtonText: {
    color: 'green'
  }
}

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductsList"
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen
          name="ProductsList"
          component={ProductsList}
          options={({ route, navigation: { navigate } }) => {
            const params = route.params || { cnt: 0 }
            return {
              title: 'Products',
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerRightButton}
                  onPress={() => navigate('ProductDetail')}
                >
                  <Text style={styles.headerRightButtonText}>Cart {params.cnt}</Text>
                </TouchableOpacity>
              )
            }
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={({ route, navigation: { navigate } }) => {
            const params = route.params || { cnt: 0 }
            return {
              title: 'Checkout',
              // eslint-disable-next-line react/display-name
              headerRight: () => (
                <TouchableOpacity
                  style={styles.headerRightButton}
                  onPress={() => navigate('ProductDetail')}
                >
                  <Text style={styles.headerRightButtonText}>Cart {params.cnt}</Text>
                </TouchableOpacity>
              )
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
