import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';

const QuestionScreen = () => {
  const [question, setQuestion] = useState("Give me a simple multiplcation math question to answer");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Initialize Gemini API
  const geminiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const validateAnswer = async () => {
    try {
      // Combine the question and user answer to validate with Gemini
      const validationPrompt = `Question: ${question} User's Answer: ${answer}. Is the answer correct?`;

      const result = await model.generateContent(validationPrompt);
      const responseText = await result.response;

      // Check if Gemini's response indicates correctness
      if (responseText.text().toLowerCase().includes("yes")) {
        setFeedback("Correct Answer! Well done.");
      } else {
        setFeedback("Incorrect Answer. Try again!");
      }
    } catch (error) {
      console.error("Error validating answer:", error);
      setFeedback("Error validating answer.");
    }
  };

  const handleSubmit = () => {
    // Perform the answer validation
    validateAnswer();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Answer the questions to regain access</Text>

        {/* Pass setQuestion to QuestionComponent to get the question */}
        <QuestionComponent setQuestion={setQuestion} />

        {/* User input for answer */}
        <TextComponent answer={answer} setAnswer={setAnswer} onSubmit={handleSubmit} />

        {/* Button to submit the answer */}
        <ButtonComponent onPress={handleSubmit} />

        {/* Display feedback */}
        {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
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
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins',
  },
});
