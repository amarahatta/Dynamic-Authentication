import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EmergencyButton = () => {
  // Simulating emergency call currently not avaliable with react
  const handleEmergency = async () => {
    Alert.alert("Emergency Call", "Phone dialer is not available on this device");
  };
  return (
    <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
      <Text style={styles.emergencyText}>Emergency</Text>
    </TouchableOpacity>
  );
};

export default EmergencyButton;

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: '#222222',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 120,
    marginBottom: 20,
  },
  emergencyText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
});