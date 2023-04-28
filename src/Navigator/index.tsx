import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from '../constant';
import Login from '../screens/Login';
import Main from '../screens/main';
import Splash from '../screens/Splash';
import React from 'react';
import {BackHandler,Alert} from 'react-native';
const{LOGIN,MAIN,SPLASH} = SCREENS;

export default function Navigator() {
    const Stack = createNativeStackNavigator();
    const navigationRef:any =  React.createRef()

    React.useEffect(() => {
      function handleBackButton() {
        const routeInfo = navigationRef.current.getCurrentRoute();
        if (
          routeInfo.name.toLowerCase() === LOGIN ||
          routeInfo.name.toLowerCase() === MAIN
        ) {
          exitApp();
        } else {
          if (navigationRef.current.canGoBack()) {
            navigationRef.current.goBack();
          }
        }
        return true;
      }
  
      // Handle when back button pressed
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackButton
      );
      return () => backHandler.remove();
    }, []);
  
    // ****************************** exit function ***********************************
    const exitApp = () => {
      Alert.alert(
        "Exit App",
        "Exiting the application?",
        [
          {
            text: "Cancel",
            onPress: () => { },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {
          cancelable: false,
        }
      );
    };
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
