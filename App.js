import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SiteHome } from './views/SiteHome.jsx'
import { ChildrenComponent } from './components/ChildrenComponent.jsx'
import { NodeComponent } from './components/NodeComponent.jsx'
import { NodeContent } from './components/NodeContent.jsx'
const Stack = createStackNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={SiteHome} />
        <Stack.Screen name='ChildrenComponent' component={ChildrenComponent} />
        <Stack.Screen name='NodeComponent' component={NodeComponent} />
        <Stack.Screen name='NodeContent' component={NodeContent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
