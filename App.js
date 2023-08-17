import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SiteHome } from './views/SiteHome.jsx'
import { ChildrenComponent } from './components/ChildrenComponent.jsx'

const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={SiteHome} />
        <Stack.Screen name='ChildrenComponent' component={ChildrenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
