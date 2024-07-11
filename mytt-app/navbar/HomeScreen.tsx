import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Program } from '../models';
import ProgramCard from '../components/ProgramCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dropdown } from 'react-native-element-dropdown';

export type RootStackParamList = {
    Home: undefined;
    ProgramDetails: { program: Program };
    RegistrationScreen: undefined;
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const programs: Program[] = [
    {
      id: 1,
      name: 'Junior Engineers Club',
      description: 'Youth ages 9-13 will learn how to build and program robots through several obstacle courses every Saturday for 8 weeks.',
      date: 'Jun 1 - Jul 27, 2024',
      price: '$50',
      photoUri: 'https://s3-alpha-sig.figma.com/img/dcba/1b3f/2169ce87b1177c1c153250cd74a98a8e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LfSGoecPzZDboaiUEtx7rCi6zGL1IW9QHckmVGXZeqWBLcO4paXBx-VBYbQ4SybqIZTS4n2uvgvboKyIy9WAi92CwnLNvCZ8DrnIinJHFEMFIrV8xZQLz~o0eW8NvD8rKcvSiOHslrv3QOed5c3~BHRKxF7CfJJDYna8hobLdwMF-SgTq34xlzIXjZo8~fUshzaUk4PH2kwq4e1~dwdiXqWugIUNxT3vGHk7WuJnw49cXCVdlihMlCr7siX1AcGpH97V2x0uM-0aMFDGjcD4184kOfqgdojQLS5MGcII~8LX0tsTau8nlczTvAnhtcdX7mX1EssF7XbOt2FrHY77ww__',
      category: 'Robotics',
      location: 'Vancouver BC'
    },
    {
        id: 2,
        name: 'Titan Engineers Club',
        description: 'By the end of the 4-week session, your teen will build essential robotic skills preparing them for the ever-evolving world of STEM.',
        date: 'Sat, Jul 13, 2024 10:00 AM',
        price: '$50',
        photoUri: 'https://s3-alpha-sig.figma.com/img/378c/7131/46b737c4610c9e7a0f1ff3eb23d055ae?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QUBievlWoO0vy03A7vkdy0pJKiBDelHbHtCgk~6Y63ypO6buDoUKNPK5~ZlBph8IXX6Bb-QGi~BMErIm0THdgHChIZZtDoRjOO-aOqSIHGgJue6k-S7QIxsn~oZGnXlHg5x2lt6HeTt~wtcRM-exRfUa1enKt30ltUA4XpegQp41567kFuTU~NVNIDTKZ9nRz~C7cPgjcw~js5TgqrtGBaj-47KLMPq2YjtNKaqd2isirI~zS~KSsJZkmXBYyTNa2BysfyvtgqJfo~vJtBqXeJ2YJyrG1SjLnSOmZ1yaCTY8kM~TTCoqIAVJN8DOOOeDHUxYFAbvtGOgeZttmmo64g__',
        category: 'Coding',
        location: 'Vancouver BC'
    },
    {
        id: 3,
        name: 'Tech Day: Gary',
        description: 'Join us for Tech Day in Gary, a fun-filled event for ages 9-18 featuring interactive workshops, hands-on tech demos, and inspiring talks to spark curiosity and creativity in technology!',
        date: 'August 17, 2024',
        price: 'Free',
        photoUri: 'https://s3-alpha-sig.figma.com/img/b64e/9b0c/10f463d3d55716342955c424d473df13?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P2xh4gkh1Owg2c0VeKotpji~XqLxVcGjBUf9nECCLflBb~jzAzeOvyGdEKP3AThjZlKOng7B-57vrAg-HmnBhsQAdC5mNn4A2CasnAvjvSD5vYwI9oItw4bNDxO4Z61ohhOTtO-bKa0JGcZ1601y1VqWoatykPntOoJlJTGniioksnUjMy1GPkBgsIZV-p4oPzfFDSC4x7CaL3Cx19Y~lvpC4Yv2Eqf~0-KGg7LRrDBkRnVYx~TcJapumks2oA3FvMl6odGqVIKXZXrH9Go6g4qlK76b8EeBgho6nalTVPKNWn~Ou3wEROSty2ngPhXI4uxG2aeow54559wxjwh2nQ__',
        category: 'Robotics',
        location: 'Edmonton AB'
    },
    {
        id: 4,
        name: 'Tech Day: Matteson',
        description: 'Join us for Tech Day in Matteson, a fun-filled event for ages 6-18 featuring interactive workshops, hands-on tech demos, and inspiring talks to spark curiosity and creativity in technology!',
        date: 'April 20, 2023',
        price: 'Free',
        photoUri: 'https://s3-alpha-sig.figma.com/img/9913/16f6/d0128f7468c090f804089ae6c7a4880b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jddmiowEXq4tu1V0eCm7icmfatLn4NhguWj5a6P03IYzN0w2bBGeKTM91OOwr6nNoM1fWxx4n~U~P2N4lFVU93~8KA~NWD-dzP3388XCjJeCxpcYABqAfc16YnPexpKy2D6G~o8Khy~oynUjhgZ7Nmp-c05tSGya8GzuvqdfIaKvblcofOakOCMfvM9csSiQzeydEXZg0zse8XxOslawIM0dqHzmwtn9R4yV5qdCicWB8voqD4mIh~7e9gA7ByxYfZwiNd~tTcJ2zwo-dJZY~S~ipeTZZTc-zZYST5XFF7VEKtbb~zb8wiEwxhiZSdJztwUiv8~ZaWg2~HvKQhpKeg__',
        category: 'Game Development',
        location: 'Edmonton AB'
    },
	{
        id: 5,
        name: 'Code Club: Junior Edition',
        description: 'Join MYTT Code Club: Junior Edition for ages 9-12...',
        date: 'April 20, 2023',
        price: '$125',
        photoUri: 'https://s3-alpha-sig.figma.com/img/df9e/8e55/b0d5050cfcbca66cee9d344c903b3e5c?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fjyImQAPvCmdh1DNnh006W6VhGT4u~U7w466gceRZ3UqtzLekIDQdgV6GWgqdD3IHmnNC6TDuqVrJGUb6--0o9CoumUT6TRvP-EpTFZ07-j4ZZ80AceD4Y4ljmSSHYRFxkfqOKPYZWAL0OIC0txZpqZl006W8HhRt5EhG9z1iB8IB8qj6hk23ZHE3GLkyXualHazIsZgJFkV4r8nVoq0bzlhlH6doNidj2mbdBGSnE-bIsAoqjgYURZ3xKprUmMyk1rO5T51mNPf~Chcm~BSDPg7b31l9tyo7plvgpEOdwHMpWBcAjgFHCPAnA5M9uVX~xg6yxmy7M0DnPv~wClbhA__',
        category: 'Game Development',
        location: 'Edmonton AB'
    },
  ];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const navigation = useNavigation<HomeScreenNavigationProp>();  // prop navigation
  const categories = [
    'Robotics',
    'Coding',
    'Game Development',
    'Virtual Reality',
    'Media and Production',
    'Youth Innovation',
    'Drone Program',
    'Youth Mentoring Program',
    'Youth Intern Club',
    'Entrepreneur Club',
  ];

  const filteredPrograms = programs.filter((program) => {
    const queryMatch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = selectedCategory ? program.category === selectedCategory : true;
    const locationMatch = selectedLocation !== 'All Locations' ? program.location === selectedLocation : true;
    return queryMatch && categoryMatch && locationMatch;
  });

  const locations = ['All Locations', ...new Set(programs.map((program) => program.location))];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        {/* Profile and Notifications */}
      </View>

      <Dropdown
        style={{margin: 10}}
        data={locations.map(location => ({label: location, value: location}))}
        placeholder={selectedLocation} // updated line
        searchPlaceholder="Search location"
        labelField="label"
        valueField="value"
        onChange={(selectedItem) => setSelectedLocation(selectedItem.label)}
        />

      <TextInput
        style={styles.searchBar}
        placeholder="Search programs and events"
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
      />

      <Text style={styles.sectionTitle}>Programs</Text>
      
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryItem, item === selectedCategory && styles.categoryItemSelected]}
            onPress={() => setSelectedCategory(item === selectedCategory ? '' : item)}
          >
            <Text style={item === selectedCategory ? styles.categorySelectedText : styles.categoryItemText}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />



        {filteredPrograms.map((program) => (
        <TouchableOpacity
            key={program.id}
            onPress={() => {
            console.log('Trying to navigate to ProgramDetails with program:', program);
            navigation.navigate('ProgramDetails', { program });
            }}
        >
            <ProgramCard program={program} />
        </TouchableOpacity>
        ))}
                
        
        
    
    </ScrollView>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
	  backgroundColor: '#ffffff'
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    searchBar: {
      margin: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#f0f0f0',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 16,
      marginTop: 16,
    },
    categoriesList: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    categoryItem: {
      marginRight: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: '#f0f0f0',
    },
    categoryItemSelected: {
      backgroundColor: '#007bff', 
    },
    categoryItemText: {
      fontSize: 16,
      color: '#939393',
    },
	categorySelectedText:{
	  fontSize: 16,
	  color: '#ffffff',
	},
  });

export default HomeScreen;
