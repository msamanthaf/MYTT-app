import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './navbar/HomeScreen';
import CalendarScreen from './navbar/CalendarScreen'; 
import ProfileScreen from './navbar/ProfileScreen'; 
import ProgramDetails from './screens/ProgramDetails';

// Define the tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProgramDetails" component={ProgramDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Home" component={HomeStack} /> 
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
