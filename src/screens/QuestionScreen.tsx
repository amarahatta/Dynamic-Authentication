import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import CountdownTimer from '../components/CountdownTimer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';


type QuestionScreenProps = {
  switchToLockScreen: (attempts: number) => void;
  handleIncorrectAttempt: () => void;
  handleValidationSuccess: () => void;
  incorrectAttempts: number;
  resetIncorrectAttempts: () => void;
  switchToNextScreen: () => void;
  handleCorrectAnswer: () => void;
  handleIncorrectAnswer: () => void;
  correctAnswers: number;
};

const QuestionScreen = ({ 
  switchToLockScreen, 
  handleIncorrectAttempt, 
  handleValidationSuccess, 
  incorrectAttempts, 
  resetIncorrectAttempts, 
  switchToNextScreen,
  handleCorrectAnswer,
  handleIncorrectAnswer,
  correctAnswers
}: QuestionScreenProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timerActive, setTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [prevQuestion, setPrevQuestion] = useState("");
  // Initialize Gemini API
  const geminiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const selectRandomQuestion = async () => {
    let genQuestionList = [
      "Generate a simple addition math question",
      "Generate a simple subtraction math question",
      "Generate a simple division math question",
      "Generate a simple multiplication math question.",
      "Generate a simple algebra math question"
    ];
    let randomIndex = Math.floor(Math.random() * (await genQuestionList).length);
    let selectedQuestion = genQuestionList[randomIndex];
    console.log(selectedQuestion);
    while (prevQuestion.includes(selectedQuestion)) {
      randomIndex = Math.floor(Math.random() * (await genQuestionList).length);
      selectedQuestion = genQuestionList[randomIndex];
    }

    setPrevQuestion(selectedQuestion);
    return selectedQuestion;
  };

  const handleTimeUp = () => {
    setTimerActive(false);
    setFeedback("Time's up! Moving to next question.");
    handleIncorrectAnswer();
    handleIncorrectAttempt();
    setTimeout(() => {
      setTimerKey(prev => prev + 1);
      setTimerActive(true);
      generateNewQuestion();
      switchToNextScreen();
    }, 1000);
  };

  const generateNewQuestion = async () => {
    try {
      const prompt = await selectRandomQuestion();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const newQuestion = response.text();
      setQuestion(newQuestion);
      setAnswer("");
      setFeedback("");
    } catch (error) {
      console.error("Error generating question:", error);
      setQuestion("What is 2 + 2?"); // fallback
    }
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
        handleCorrectAnswer();
        resetIncorrectAttempts();
        setTimeout(() => {
          setTimerKey(prev => prev + 1);
          setTimerActive(true);
          generateNewQuestion();
          switchToNextScreen();
        }, 1000);
      } else {
        setFeedback("Incorrect Answer. Try again!");
        handleIncorrectAnswer();
        if (incorrectAttempts < 2) {
          handleIncorrectAttempt();
          setTimeout(() => {
            setTimerKey(prev => prev + 1);
            setTimerActive(true);
            generateNewQuestion();
            switchToNextScreen();
          }, 1000);
        }
        else {
          handleIncorrectAttempt();
          switchToLockScreen(incorrectAttempts + 1);
        }
      }
    } catch (error) {
      console.error("Error validating answer:", error);
      setFeedback("Error validating answer.");
    }
  };

  const handleSubmit = () => {
    validateAnswer();
    setAnswer('');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Answer the questions to regain access</Text>
          <Text style={styles.title}>Incorrect attempts: {incorrectAttempts} Correct attempts: {correctAnswers}</Text>
          <QuestionComponent question={question} />
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
    color: '#ACADB9',
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