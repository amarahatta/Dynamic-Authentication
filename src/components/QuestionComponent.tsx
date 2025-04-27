import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { GoogleGenerativeAI } from '@google/generative-ai';
//aimport { AI_KEY } from '@env';
import Constants from 'expo-constants';

const QuestionComponent = ({ question }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
    </View>
  );
};

export default QuestionComponent;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
  },
  questionText: {
    fontFamily: 'Poppins',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 32,
    textAlign: 'center',
  },
});
