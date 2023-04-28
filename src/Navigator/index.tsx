import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constant';
import Login from '../screens/Login';
import Main from '../screens/main';
import Splash from '../screens/Splash';
const{LOGIN,MAIN,SPLASH} = SCREENS;

export default function Navigator() {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={SPLASH}>
            <Stack.Screen name={LOGIN} component={Login}/>
            <Stack.Screen name={MAIN} component={Main}/>
            <Stack.Screen name={SPLASH} component={Splash}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
