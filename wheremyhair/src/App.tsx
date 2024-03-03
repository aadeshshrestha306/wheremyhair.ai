import React from 'react';
import { Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Ionicons';

import Login from './screens/login';
import Signup from './screens/signup';
import HomeScreen from './screens/home';
import CameraScreen from './screens/camera';
import ProfileView from './screens/profile';
import InfoScreen from './screens/info';

export type RootStackParamList = {
  SignupScreen: undefined;
  LoginScreen: undefined;
  Home: undefined;
  Camera: undefined;
  Profile: undefined;
  Info: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const App = () => {
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='SignupScreen'
        screenOptions={{
          tabBarActiveTintColor: '#242219',
          tabBarStyle: styles.navbar,
          tabBarIconStyle: styles.navbar_icons,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icons name={focused ? 'home' : 'home-outline'} color={'rgba(255, 255, 255, 0.9)'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Camera'
          component={CameraScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icons name={focused ? 'camera' : 'camera-outline'} color={'rgba(255, 255, 255, 0.9)'} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileView}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icons name={focused ? 'person' : 'person-outline'} color={'rgba(255, 255, 255, 0.9)'} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Info'
          component={InfoScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Icons name={focused ? 'bulb' : 'bulb-outline'} color={'rgba(255, 255, 255, 0.9)'} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  navbar:{
    backgroundColor: '#242219',
  },

  navbar_icons:{
    margin: 5,
  }
})


export default App;
