import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import EmergencyButton from '../components/EmergencyButton';



const LockScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.lockIconContainer}>
            <Image
              source={require('../assets/lock_large.png')}
              style={styles.lockIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Device Locked</Text>

          <Text style={styles.description}>
            Possible theft detected. The location of{'\n'}
            this device has been sent to the owner.
          </Text>

          <Text style={styles.timer}>
            Try Again in 1 Minute
          </Text>
        </View>

        <EmergencyButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 300,
    paddingBottom: 50,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  lockIconContainer: {
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockIcon: {
    width: 100,
    height: 100,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  timer: {
    color: '#999999',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
});

export default LockScreen;