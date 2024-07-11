import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React from "react";
import SplashScreen from "./components/SplashScreen";

export default function App() {
	return (
		<View style={{ flex: 1, backgroundColor: "#2166DE" }}>
			<SplashScreen />
			<StatusBar style="auto" />
		</View>
	);
}