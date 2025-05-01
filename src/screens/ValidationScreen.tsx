import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

type ValidationScreenProps = {
  resetIncorrectAttempts: () => void;
  resetCorrectAnswers: () => void;
};

const ValidationScreen = ({ resetIncorrectAttempts, resetCorrectAnswers }: ValidationScreenProps) => {
  useEffect(() => {
    // Reset both counters when the validation screen mounts
    resetIncorrectAttempts();
    resetCorrectAnswers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Entry Validated</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ValidationScreen;
