import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen: React.FC = () => {
  const onDayPress = (day: any) => {  // Use 'any' for simplicity
    console.log('selected day', day);
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={'2023-04-01'}
        onDayPress={onDayPress}
        markedDates={{
          '2023-04-16': { selected: true, marked: true, selectedColor: 'blue' },
          '2023-04-17': { marked: true },
          '2023-04-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
        }}
        // The rest of your Calendar properties
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScreen;
