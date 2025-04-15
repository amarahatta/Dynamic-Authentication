import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import CountdownTimer from '../components/CountdownTimer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';

const QuestionScreen = () => {
  const [question, setQuestion] = useState("Give me a simple multiplication math question to answer");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timerActive, setTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  // Initialize Gemini API
  const geminiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleTimeUp = () => {
    setTimerActive(false);
  };

  const validateAnswer = async () => {
    try {
      // Combine the question and user answer to validate with Gemini
      const validationPrompt = `Question: ${question} User's Answer: ${answer}. Is the answer correct?`;
      const result = await model.generateContent(validationPrompt);
      const responseText = await result.response;

      // Check if Gemini's response indicates correctness
      if (responseText.text().toLowerCase().includes("yes")) {
        setFeedback("Correct Answer! Well done.");
        setTimerActive(false);
        setTimeout(() => {
          setTimerKey(prev => prev + 1);
          setTimerActive(true);
        }, 100);
      } else {
        setFeedback("Incorrect Answer. Try again!");
      }
    } catch (error) {
      console.error("Error validating answer:", error);
      setFeedback("Error validating answer.");
    }
  };

  const handleSubmit = () => {
    setTimerActive(false);
    validateAnswer();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Answer the questions to regain access</Text>
          <QuestionComponent setQuestion={setQuestion} />
          <TextComponent answer={answer} setAnswer={setAnswer} onSubmit={handleSubmit} />
          {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
        </View>

        <View style={styles.bottomContent}>
          <CountdownTimer
            key={timerKey}
            duration={30}
            onTimeUp={handleTimeUp}
            isActive={timerActive}
          />
          <ButtonComponent onPress={handleSubmit} />
        </View>
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
    justifyContent: 'space-between',
  },
  topContent: {
    width: '100%',
  },
  bottomContent: {
    width: '100%',
    paddingBottom: 30,
    marginTop: 'auto',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins',
  },
});