import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icons from 'react-native-vector-icons/Ionicons';

import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import CameraScreen from '../screens/Camera/Camera';
import SignupScreen from '../screens/Signup';
import ProfileView from '../screens/UserProfile/Profile';
import SplashScreen from './Splash';
import { AuthContext } from '../context/AuthContext';
import ResultScreen from '../screens/Camera/Results';
import UserInfoScreen from '../screens/UserProfile/UserInfo';
import UserProgressScreen from '../screens/UserProfile/UserProgress';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
        animation:'slide_from_bottom'
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


const Outcome = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Camera'
      screenOptions={{
        headerShown: false,
        animation:'slide_from_right'
      }}
    >
      <Stack.Screen
        name='Camera'
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Result'
        component={ResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const UserProfile = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Overview'
      screenOptions={{
        headerShown: false,
        animation:'slide_from_right'
      }}
    >
      <Stack.Screen
        name='Overview'
        component={ProfileView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserInfo'
        component={UserInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserProgress'
        component={UserProgressScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Bottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#242219',
        tabBarStyle: styles.navbar,
        tabBarShowLabel: false,
        animation: 'slide_from_right'
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icons name={focused ? 'home' : 'home-outline'} color={'rgba(255, 255, 255, 0.9)'} size={26} />
         ),
      }} />

      <Tab.Screen 
        name='Output' 
        component={Outcome}
        options={{
            headerShown: false,
            tabBarStyle: { display: 'none'},
            tabBarIcon: ({ focused }) => (
              <Icons name={focused ? 'camera' : 'camera-outline'} color={'rgba(255, 255, 255, 0.9)'} size={40} />
          ),
        }} />

      <Tab.Screen 
        name='Profile' 
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icons name={focused ? 'person' : 'person-outline'} color={'rgba(255, 255, 255, 0.9)'} size={26} />
          ),
        }} />
      </Tab.Navigator>
  )
}


const MainNavigation = () => {
  const {  status } = useContext(AuthContext);
  const [ showSplash, setShowSplash ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);

  }, []);
  

  if (showSplash) {
    return <SplashScreen/>;
  }

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_left'
          }}
        >
          {status == false ? (
            <>
            <Stack.Screen
              name='Auth'
              component={Auth}
              options={{ headerShown: false }}
            />
            </>
          ):(
            <>
            <Stack.Screen
              name='Main'
              options={{ headerShown: false }}
            >
              {(Bottom)}
            </Stack.Screen>
          </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#242219',
  },
});

export default MainNavigation;
