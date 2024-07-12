import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Program } from '../models'; // Make sure to import your Program type from the correct location
import ProgramCard from '../components/ProgramCard'; // Assuming ProgramCard is a component that displays program details

const programs: Program[] = [
    {
        id: 3,
        name: 'Tech Day: Gary',
        description: 'Join us for Tech Day in Gary, a fun-filled event for ages 9-18 featuring interactive workshops...',
        date: 'August 17, 2024',
        price: 'Free',
        photoUri: 'https://s3-alpha-sig.figma.com/img/b64e/9b0c/10f463d3d55716342955c424d473df13?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P2xh4gkh1Owg2c0VeKotpji~XqLxVcGjBUf9nECCLflBb~jzAzeOvyGdEKP3AThjZlKOng7B-57vrAg-HmnBhsQAdC5mNn4A2CasnAvjvSD5vYwI9oItw4bNDxO4Z61ohhOTtO-bKa0JGcZ1601y1VqWoatykPntOoJlJTGniioksnUjMy1GPkBgsIZV-p4oPzfFDSC4x7CaL3Cx19Y~lvpC4Yv2Eqf~0-KGg7LRrDBkRnVYx~TcJapumks2oA3FvMl6odGqVIKXZXrH9Go6g4qlK76b8EeBgho6nalTVPKNWn~Ou3wEROSty2ngPhXI4uxG2aeow54559wxjwh2nQ__',
        category: 'Robotics',
        location: 'Faith Community Center, IN',
		capacity: 'Capacity: 28/32',
		bookmark: true,
		age: 'Ages 6-18',
	  	mode: 'In-Person'
    },
];

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.bookmarked}>Bookmarked Programs</Text>
      <FlatList
        data={programs.filter(program => program.bookmark)}
        renderItem={({ item }) => (
          <ProgramCard program={item} /> // Assuming ProgramCard is a component that displays program details
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  bookmarked:{
	marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default BookmarkScreen;
