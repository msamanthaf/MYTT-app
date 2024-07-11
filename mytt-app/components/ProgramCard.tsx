import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Program } from '../models';

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: program.photoUri }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{program.name}</Text>
        <Text style={styles.cardDescription}>{program.description}</Text>
        <View style={styles.cardRow}>
          <Image source={require('../assets/Vectordate.png')} style={styles.icon} />
          <Text style={styles.cardDate}>{program.date}</Text>
        </View>
        <View style={styles.cardRow}>
          <Image source={require('../assets/Vectorprice.png')} style={styles.icon} />
          <Text style={styles.cardPrice}>{program.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
	width:'90%',
	justifyContent: 'center',
	alignSelf: 'center',
	marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 18,
	color:'#2166DE',
  },
  cardDescription: {
    fontSize: 14,
    color: '#717171',
	paddingVertical:10,
  },
  cardDate: {
    fontSize: 14,
	paddingBottom:5,
	fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default ProgramCard;
