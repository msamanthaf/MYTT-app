import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Program } from '../models';
import ProgramCard from '../componets/ProgramCard';

const programs: Program[] = [
    {
      id: 1,
      name: 'Junior Engineers Club',
      description: 'Youth ages 9-13 will learn how to build and program robots through several obstacle courses every Saturday for 8 weeks.',
      date: 'Jun 1 - Jul 27, 2024',
      price: '$50',
      photoUri: 'https://via.placeholder.com/150',
      category: 'Robotics',
    },
    {
        id: 2,
        name: 'Titan Engineers Club',
        description: 'By the end of the 4-week session, your teen will build essential robotic skills preparing them for the ever-evolving world of STEM.',
        date: 'Sat, Jul 13, 2024 10:00 AM',
        price: '$50',
        photoUri: 'https://via.placeholder.com/150',
        category: 'Coding',
    },
    {
        id: 3,
        name: 'Tech Day: Gary',
        description: 'Join us for Tech Day in Gary, a fun-filled event for ages 9-18 featuring interactive workshops, hands-on tech demos, and inspiring talks to spark curiosity and creativity in technology!',
        date: 'August 17, 2024',
        price: 'Free',
        photoUri: 'https://via.placeholder.com/150',
        category: 'Robotics',
    },
    {
        id: 4,
        name: 'Tech Day: Matteson',
        description: 'Join us for Tech Day in Matteson, a fun-filled event for ages 6-18 featuring interactive workshops, hands-on tech demos, and inspiring talks to spark curiosity and creativity in technology!',
        date: 'April 20, 2023',
        price: 'Free',
        photoUri: 'https://via.placeholder.com/150',
        category: 'Game Development',
    },
  ];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
    return queryMatch && categoryMatch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        {/* Profile and Notifications */}
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search programs and events"
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
      />

      <Text style={styles.sectionTitle}>Program</Text>
      
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryItem, item === selectedCategory && styles.categoryItemSelected]}
            onPress={() => setSelectedCategory(item === selectedCategory ? '' : item)}
          >
            <Text style={styles.categoryItemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      {filteredPrograms.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      paddingVertical: 10,
    },
    categoryItem: {
      marginRight: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
    },
    categoryItemSelected: {
      backgroundColor: '#007bff', 
    },
    categoryItemText: {
      fontSize: 16,
      color: '#000',
    },
  });

export default HomeScreen;
