import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  const profilePicUrl = 'https://www.w3schools.com/howto/img_avatar.png'; // Placeholder profile picture

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: profilePicUrl }}
            style={styles.profilePic}
          />
          <Text style={styles.title}>John Doe</Text>
          <Text style={styles.subtitle}>Parent of Lisa</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>johndoe@example.com</Text>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoText}>Gary, IN</Text>
          <Text style={styles.infoLabel}>Registered Since:</Text>
          <Text style={styles.infoText}>
            07/12/2024
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#2166DE',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A1DD0C',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  profileInfo: {
    width: '100%',
  },
  infoLabel: {
    color: '#A1DD0C',
    fontSize: 16,
    marginTop: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
