/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screen/home/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewComponent from './src/component/WebViewComponent';
import VideoPlayerComponent from './src/component/VideoPlayerComponent';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="WebView" component={WebViewComponent} />
      <HomeStack.Screen name="VideoPlayer" component={VideoPlayerComponent} />
    </HomeStack.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: '#f8f9fa',
          tabBarInactiveTintColor: '#676767',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
          },
          tabBarStyle: {
            backgroundColor: '#343434',
          },
        })}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
