import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Program } from '../models';
import ProgramCard from '../components/ProgramCard';
import { useNavigation } from '@react-navigation/native';
import {RootStackParamList} from './HomeScreen';
import { StackNavigationProp } from '@react-navigation/stack';
type CalendarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProgramDetails'>;

const mockPrograms: Program[] = [
  {
    id: 1,
    name: 'Junior Engineers Club',
    description: 'Youth ages 9-13 will learn how to build and program robots through several obstacle courses every Saturday for 8 weeks.',
    date: '2023-04-17',
    price: '$50',
    photoUri: 'https://s3-alpha-sig.figma.com/img/dcba/1b3f/2169ce87b1177c1c153250cd74a98a8e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LfSGoecPzZDboaiUEtx7rCi6zGL1IW9QHckmVGXZeqWBLcO4paXBx-VBYbQ4SybqIZTS4n2uvgvboKyIy9WAi92CwnLNvCZ8DrnIinJHFEMFIrV8xZQLz~o0eW8NvD8rKcvSiOHslrv3QOed5c3~BHRKxF7CfJJDYna8hobLdwMF-SgTq34xlzIXjZo8~fUshzaUk4PH2kwq4e1~dwdiXqWugIUNxT3vGHk7WuJnw49cXCVdlihMlCr7siX1AcGpH97V2x0uM-0aMFDGjcD4184kOfqgdojQLS5MGcII~8LX0tsTau8nlczTvAnhtcdX7mX1EssF7XbOt2FrHY77ww__',
    category: 'Robotics',
    location: 'MYTT Stem Center, IL',
    capacity: 'Capacity: 14/24',
    bookmark: false,
	age: 'Ages 9-13',
	mode: 'In-Person',
  },
  // Additional programs can be added here
];

interface DateData {
  dateString: string; // This is usually the minimum you'd get
  day: number;
  month: number;
  year: number;
}

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<any>({});
  const navigation = useNavigation<CalendarScreenNavigationProp>();
  
  useEffect(() => {
    const initialMarkedDates = {};
    mockPrograms.forEach(program => {
      initialMarkedDates[program.date] = { marked: true, dotColor: 'red' };
    });
    setMarkedDates(initialMarkedDates);
  }, []);

  const onDayPress = (day: DateData) => {
    const updateMarkedDates = { ...markedDates };
    Object.keys(updateMarkedDates).forEach(key => {
      updateMarkedDates[key] = { ...updateMarkedDates[key], selected: false, selectedColor: undefined };
    });
    updateMarkedDates[day.dateString] = {
      ...updateMarkedDates[day.dateString],
      selected: true,
      selectedColor: 'red',
    };
    setMarkedDates(updateMarkedDates);
    setSelectedDate(day.dateString);
  };

  // Filter to find programs for the selected date
  const programsForSelectedDate = mockPrograms.filter(program => program.date === selectedDate);

  return (
    <View style={styles.container}>
      <Calendar
        current={'2023-04-01'}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      <ScrollView style={styles.programsList}>
        {programsForSelectedDate.length > 0 ? (
          programsForSelectedDate.map(program => (
            <TouchableOpacity
              key={program.id}
              onPress={() => navigation.navigate('ProgramDetails', { program })}
            >
              <ProgramCard program={program} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noEventsText}>
            No event booked, please feel free to schedule it!
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const  styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  programsList: {
    flex: 1,
    paddingHorizontal: 5,
  },
  noEventsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CalendarScreen;
