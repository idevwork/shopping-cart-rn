import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ProductDetail from './app/components/ProductDetail'
import ProductsList from './app/containers/ProductsList'

const MainNavigator = createStackNavigator(
  {
    ProductsList: { screen: ProductsList },
    ProductDetail: { screen: ProductDetail }
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
