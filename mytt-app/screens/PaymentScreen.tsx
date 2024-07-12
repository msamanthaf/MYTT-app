import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hooks

const PaymentScreen = () => {
  const navigation = useNavigation(); // Navigation instance

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handleConfirm = () => {
    // Handle confirmation logic here
    console.log('Confirmed!');
    // Navigate to SuccessScreen
    navigation.navigate('Success');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Confirm Payment</Text>
		<View style={styles.logoContainer}>
          <Image source={require('../assets/mastercard.png')} style={styles.logo} />
          <Image source={require('../assets/visa.png')} style={styles.logo} />
          <Image source={require('../assets/amex.png')} style={styles.logo} />
        </View>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter card number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Expiry Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
          keyboardType="numeric"
        />
        <Text style={styles.label}>CVV</Text>
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCVV}
          keyboardType="numeric"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: '10%',
    alignSelf: 'center',
    marginBottom: 50,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
	marginLeft: -10,
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 20,
    marginHorizontal: 10,
  },
});

export default PaymentScreen;
