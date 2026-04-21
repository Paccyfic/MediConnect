// AppointmentStatus.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AppointmentStatusProps {
  status: string;
  color: string;
}

const AppointmentStatus: React.FC<AppointmentStatusProps> = ({ status, color }) => {
  return (
    <View style={[styles.statusContainer, { borderColor: color }]}>
      <Text style={[styles.statusText, { color }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusText: {
    fontFamily: "Urbanist-regular",
    fontSize: 12,
  }
});

export default AppointmentStatus;
