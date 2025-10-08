import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreenPractice from './screens/LoginScreen';
import ProductScreenPractice from './screens/ProductScreen';

const Stack = createStackNavigator();

export default function App(){
  return(
       <NavigationContainer>
    <Stack.Navigator initialRouteName = "Login">
      <Stack.screen name="Login" component="LoginScreenPractice"/>
      <Stack.screen name="ProductScreen" component="ProductScreenPractice"/>
    </Stack.Navigator>
  </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
