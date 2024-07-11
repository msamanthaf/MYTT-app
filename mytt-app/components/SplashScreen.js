import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Animated, Easing } from "react-native";
import * as Font from "expo-font";
import { GoogleButton } from "./GoogleButton";

const SplashScreen = ({ loginWithGoogle }) => {
	const [fadeAnim] = useState(new Animated.Value(0));
	const [positionAnim] = useState(new Animated.Value(0));
	const [buttonFadeAnim] = useState(new Animated.Value(0));
	const [isFontLoaded, setIsFontLoaded] = useState(false);

	useEffect(() => {
		const loadFont = async () => {
			await Font.loadAsync({
				Poppins: require("../assets/Poppins-Regular.ttf"),
			});
			setIsFontLoaded(true);
		};
		loadFont();

		const positionAnimation = Animated.timing(positionAnim, {
			toValue: -50,
			duration: 500,
			useNativeDriver: true,
			easing: Easing.linear,
		});

		const fadeUpAnimation = Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true,
			easing: Easing.linear,
		});

		Animated.sequence([fadeUpAnimation, positionAnimation]).start(() => {
			Animated.timing(buttonFadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
				easing: Easing.linear,
			}).start();
		});
	}, []);

	if (!isFontLoaded) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.fadeContainer,
					{
						opacity: fadeAnim,
						transform: [{ translateY: positionAnim }],
					},
				]}
			>
				<Image
					source={require("../assets/MYTT_Logo.png")}
					style={styles.image}
					resizeMode="contain"
				/>
			</Animated.View>
			<Animated.View style={{ opacity: buttonFadeAnim }}>
				<GoogleButton
					text="Login with Google"
					onPress={loginWithGoogle}
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2166DE",
		justifyContent: "center",
		alignItems: "center",
	},
	fadeContainer: {
		alignItems: "center",
	},
	image: {
		width: 154,
		height: 93,
	},
	text: {
		fontSize: 50,
		color: "#F7F7E1",
		fontFamily: "Poppins",
		fontWeight: "bold",
	},
	button: {
		marginTop: 20,
		padding: 10,
		backgroundColor: "#4CAF50",
		color: "white",
		fontSize: 20,
	},
});

export default SplashScreen;
