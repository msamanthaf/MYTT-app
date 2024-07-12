import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home'); // Navigate to Home screen
  };

  const handleImageButtonPress = () => {
    navigation.navigate('Home'); // Navigate to Home screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirmation</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>Thank you for registering!</Text>
        <Text style={styles.desc}>Your enrollment is confirmed. We look forward to seeing you in our upcoming STEM programs. Stay tuned for more details.</Text>
        {/* Button image */}
        <TouchableOpacity onPress={handleImageButtonPress}>
          <Image
            source={require('../assets/homeButton.png')} // Replace with your button image source
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
	top: '15%'
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 30,
  },
  buttonImage: {
    width: 150,
    height: 40,
	marginTop: 50
  },
});

export default SuccessScreen;
