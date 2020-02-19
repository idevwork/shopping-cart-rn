import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ProductsList from './app/containers/ProductsList'

const MainNavigator = createStackNavigator(
  {
    ProductsList: { screen: ProductsList },
    ProductDetail: { screen: ProductsList }
  },
  {
    initialRouteName: 'ProductsList',
    defaultNavigationOptions: {
      headerTintColor: 'blue',
      headerTitleStyle: {}
    }
  }
)

const App = createAppContainer(MainNavigator)

export default App
