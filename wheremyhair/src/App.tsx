import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/Ionicons';

import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import CameraScreen from './screens/Camera';
import SignupScreen from './screens/Signup';
import ProfileView from './screens/Profile';
import Splash from './components/Splash';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Home: undefined;
  Camera: undefined;
  Profile: undefined;
  LoginScreen: undefined;
  SignupScreen: undefined;
  SplashScreen: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SignupScreen'
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Auth'
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          options={{ headerShown: false }}
        >
          {() => (
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: '#242219',
                tabBarStyle: styles.navbar,
                tabBarShowLabel: false,
              }}
            >
              <Tab.Screen
               name='Home'
               component={HomeScreen}
               options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <Icons name={focused ? 'home' : 'home-outline'} color={'rgba(255, 255, 255, 0.9)'} size={24} />
                ),
              }} />

              <Tab.Screen 
                name='Camera' 
                component={CameraScreen}
                options={{
                  headerShown: false,
                  tabBarStyle: {display: 'none'},
                  tabBarIcon: ({ focused }) => (
                    <Icons name={focused ? 'camera' : 'camera-outline'} color={'rgba(255, 255, 255, 0.9)'} size={36} />
                  ),
                }} />

              <Tab.Screen 
                name='Profile' 
                component={ProfileView}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ focused }) => (
                    <Icons name={focused ? 'person' : 'person-outline'} color={'rgba(255, 255, 255, 0.9)'} size={24} />
                  ),
                }} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#242219',
  },
});

export default App;
