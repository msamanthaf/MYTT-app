import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { Program, ProgramHoster } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navbar/HomeScreen';
import RegistrationScreen from '../Registration';
import { useNavigation } from '@react-navigation/native';


type ProgramDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'ProgramDetails'>;

const ProgramDetails: React.FC<{ route: any }> = ({ route }) => {
    const program: Program = route.params.program;
  const host: ProgramHoster = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    number: '555-1234',
  };
  const navigation = useNavigation<ProgramDetailsNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Program Detail</Text>
      <Image source={{ uri: program.photoUri }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{program.category}</Text>
        <Text style={styles.ageLocation}> {program.age} {program.location}</Text>
        <View style={styles.nameCapacity}>
          <Text style={styles.name}>{program.name}</Text>
          <Text style={styles.capacity}>Capacity: {program.capacity}</Text>
        </View>
        <Text style={styles.longDescription}>{program.longDescription}</Text>
        <Text style={styles.datePrice}>{program.date} | {program.price}</Text>
        <Text style={styles.location}>{program.location}</Text>
        <View style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Need help?</Text>
          <Text>{host.name}</Text>
          <Text>{host.email}</Text>
          <Text>{host.number}</Text>
        </View>
        <Button title="Register" onPress={() => navigation.navigate('RegistrationScreen')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff', 
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10, 
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 16,
    },
    detailsContainer: {
      // Container for all details
    },
    category: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 5,
    },
    ageLocation: {
      fontSize: 16,
      marginBottom: 5,
    },
    nameCapacity: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    name: {
      fontSize: 20,
      fontWeight: '500',
    },
    capacity: {
      fontSize: 16,
      color: '#666',
    },
    longDescription: {
      fontSize: 16,
      marginBottom: 5,
      color: '#333',
    },
    datePrice: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
    },
    location: {
      fontSize: 16,
      marginBottom: 5,
    },
    helpContainer: {
      marginTop: 20, // Add some space above the help section
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
    },
    helpTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    // Add styles for the text within the help section if needed
  });
  
  export default ProgramDetails;
  
