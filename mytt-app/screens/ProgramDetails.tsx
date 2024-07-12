import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Program, ProgramHoster } from '../models';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navbar/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type ProgramDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'ProgramDetails'>;

const ProgramDetails: React.FC<{ route: any }> = ({ route }) => {
    const program: Program = route.params.program;
    const host: ProgramHoster = {
        name: '👤 Dr. Gina Driskell',
        email: '📧 gdriskell@myttil.com',
        number: '📞 (708) 996-1080',
    };
    const navigation = useNavigation<ProgramDetailsNavigationProp>();

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Program Details</Text>
            <Image source={{ uri: program.photoUri }} style={styles.image} />
			<View style={styles.detailsContainer}>
                <View style={styles.row}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{program.category}</Text>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{program.age}</Text>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{program.mode}</Text>
                    </View>
                </View>
                <View style={styles.nameCapacity}>
                    <Text style={styles.name}>{program.name}</Text>
                    <Text style={styles.capacity}>{program.capacity}</Text>
                </View>
                <Text style={styles.longDescription}>{program.description}</Text>
				<View style={styles.cardRow}>
        		  <Image source={require('../assets/Vectordate.png')} style={styles.icon} />
         		  <Text style={styles.datePrice}>{program.date}</Text>
       			</View>
				<View style={styles.cardRow}>
          			<Image source={require('../assets/Vectorlocation.png')} style={styles.icon} />
         			<Text style={styles.location}>{program.location}</Text>
      			</View>
                <View style={styles.helpContainer}>
                    <Text style={styles.helpTitle}>Need help? Contact Us</Text>
                    <Text>{host.name}</Text>
                    <Text>{host.email}</Text>
                    <Text>{host.number}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.registerButton} 
                    onPress={() => navigation.navigate('RegistrationScreen')}
                >
                    <Text style={styles.buttonText}>Register {program.price}</Text>
                </TouchableOpacity>
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
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 10,
        textAlign: 'center',
    },
	cardRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 5,
		alignContent:'center',
	},
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
		borderRadius: 12
    },
    detailsContainer: {
        // Container for all details
    },
	row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
		marginBottom: 20
    },
	categoryContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 14,
    },
    nameCapacity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
		color: '#2166DE'
    },
    capacity: {
        fontSize: 14,
        color: '#666',
    },
	icon: {
		width: 14,
		height: 14,
		marginRight: 5,
		marginBottom: 5
	},
    longDescription: {
        fontSize: 16,
        marginVertical: 15,
        color: '#000',
		fontWeight:'600'
    },
    datePrice: {
        fontSize: 16,
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        marginBottom: 5,
    },
    helpContainer: {
        marginTop: 20,
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
	registerButton: {
        backgroundColor: '#A1DD0C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
		width: '80%',
		height: '10%',
		alignSelf:'center',
		justifyContent:'center'
    },
    buttonText: {
        color: '#101010',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProgramDetails;
