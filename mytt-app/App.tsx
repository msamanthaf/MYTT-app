import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './navbar/HomeScreen';
import CalendarScreen from './navbar/CalendarScreen'; 
import ProfileScreen from './navbar/ProfileScreen'; 

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
					<Tab.Navigator>
					  <Tab.Screen name="Home" component={HomeScreen} />
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
