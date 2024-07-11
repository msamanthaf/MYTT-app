import React,  { useState }  from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Program } from '../models';

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
	const [isBookmarked, setIsBookmarked] = useState(program.bookmark);

	const toggleBookmark = () => {
	  setIsBookmarked(!isBookmarked);
	};

  return (
    <View style={styles.card}>
      <Image source={{ uri: program.photoUri }} style={styles.cardImage} />
	  <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
        <Image source={isBookmarked ? require('../assets/bookmarkActive.png') : require('../assets/bookmarkInactive.png')} style={styles.bookmarkIcon} />
      </TouchableOpacity>
	  <View style={styles.priceContainer}>
    	<Image source={require('../assets/Vectorprice.png')} style={styles.icon} />
    	<Text style={styles.cardPrice}>{program.price}</Text>
	  </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{program.name}</Text>
        <Text style={styles.cardDescription}>{program.description}</Text>
        <View style={styles.cardRow}>
          <Image source={require('../assets/Vectordate.png')} style={styles.icon} />
          <Text style={styles.cardDate}>{program.date}</Text>
        </View>
        <View style={styles.cardRow}>
          <Image source={require('../assets/Vectorlocation.png')} style={styles.icon} />
          <Text style={styles.cardLocation}>{program.location}</Text>
		  <Text style={styles.cardCapacity}>{program.capacity}</Text>
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
	fontWeight: 'bold',
  },
  cardPrice: {
    fontSize: 14,
	fontWeight: 'bold',
  },
  priceContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
	paddingHorizontal: 10,
  },
  cardLocation: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardCapacity: {
    marginLeft: 'auto',
	color: '#717171',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
	alignContent:'center',
  },
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 6,
	paddingVertical: 5
  },
  bookmarkIcon: {
    width: 16,
    height: 18,
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});

export default ProgramCard;
