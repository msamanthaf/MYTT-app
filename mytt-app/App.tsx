import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './navbar/HomeScreen';
import CalendarScreen from './navbar/CalendarScreen'; 
import ProfileScreen from './navbar/ProfileScreen'; 
import ProgramDetails from './screens/ProgramDetails';
import { Image } from 'react-native';
import HomeIcon from './assets/Vectorhome.png';
import HomeInactive from './assets/homeInactive.png';
import CalendarIcon from './assets/Vectorcalendar.png';
import CalendarInactive from './assets/calendarInactive.png';
import ProfileIcon from './assets/Vectorprofile.png';
import ProfileInactive from './assets/profileInactive.png';

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
	const [isLoaded, setIsLoaded] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const Tab = createBottomTabNavigator();
  

	const loginWithGoogle = () => {
		setIsLoggedIn(true);
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 2000);
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: "#2166DE" }}>
			{isLoaded ? (
				isLoggedIn ? (
					<NavigationContainer>
					<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused}) => {
      let icon;

      if (route.name === 'Home') {
        icon = focused ? <Image source={HomeIcon} style={{ width: 24, height: 24 }} /> : <Image source={HomeInactive} style={{ width: 24, height: 24, opacity: 0.5 }} />;
      } else if (route.name === 'Calendar') {
        icon = focused ? <Image source={CalendarIcon} style={{ width: 24, height: 24 }} /> : <Image source={CalendarInactive} style={{ width: 24, height: 24, opacity: 0.5 }} />;
      } else if (route.name === 'Profile') {
        icon = focused ? <Image source={ProfileIcon} style={{ width: 24, height: 24 }} /> : <Image source={ProfileInactive} style={{ width: 24, height: 24, opacity: 0.5 }} />;
      }

      return icon;
    },
	headerShown: false
  })}
>
  <Tab.Screen name="Home" component={HomeStack} />
  <Tab.Screen name="Calendar" component={CalendarScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
					<StatusBar style="auto" />
				  </NavigationContainer>
				) : (
					<SplashScreen loginWithGoogle={loginWithGoogle} />
				)
			) : (
				<SplashScreen loginWithGoogle={loginWithGoogle}/>
			)}
			<StatusBar style="auto" />
		</View>
	);
}
