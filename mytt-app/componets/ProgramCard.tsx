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
        <Text style={styles.cardDate}>{program.date}</Text>
        <Text style={styles.cardPrice}>{program.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardDate: {
    fontSize: 14,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProgramCard;
