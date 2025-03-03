import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';

const QuestionScreen = () => {
  const [question, setQuestion] = useState(
    "What is the name of the coffee shop you visited yesterday at 2PM?"
  );

  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {

    //Currenly Just submits and alerts (need to add question gathering from gemma)
    Alert.alert("Your Answer", answer);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Answer the questions to regain access</Text>


        <QuestionComponent question={question} />

        <TextComponent
          answer={answer}
          setAnswer={setAnswer}
          onSubmit={handleSubmit}
        />

        <ButtonComponent onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
});
