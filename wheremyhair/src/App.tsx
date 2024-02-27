import React from 'react';
import { Text, View, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/login';
import Signup from './screens/signup';
import Home from './screens/home';

export type RootStackParamList = {
  SignupScreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignupScreen'>
        <Stack.Screen name='SignupScreen' component={Signup} options={ {headerShown: false} }/>
        <Stack.Screen name='LoginScreen' component={Login} options={ {headerShown: false} }/>
        <Stack.Screen name='HomeScreen' component={Home} options={ {headerShown: false} }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
