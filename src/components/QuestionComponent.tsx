import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const QuestionComponent = ({ question, onSubmit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}What is the name of the coffee shop you visited yesterday at 2pm?</Text>

    </View>
  )
}

export default QuestionComponent

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
    lineHeight: 24,

  },
});

