import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import QuestionComponent from '../components/QuestionComponent';
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import CountdownTimer from '../components/CountdownTimer';

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
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timerActive, setTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setQuestion(`What is ${a} + ${b}?`);
    setCorrectAnswer((a + b).toString());
    setUserAnswer('');
    setFeedback('');
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

  const validateAnswer = () => {
    if (userAnswer.trim() === correctAnswer) {
      setFeedback('Correct Answer! Well done.');
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
      setFeedback('Incorrect Answer. Try again!');
      handleIncorrectAnswer();
      if (incorrectAttempts < 2) {
        handleIncorrectAttempt();
        setTimeout(() => {
          setTimerKey(prev => prev + 1);
          setTimerActive(true);
          generateNewQuestion();
          switchToNextScreen();
        }, 1000);
      } else {
        handleIncorrectAttempt();
        switchToLockScreen(incorrectAttempts + 1);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Answer the questions to regain access</Text>
          <Text style={styles.title}>
            Incorrect attempts: {incorrectAttempts} Correct attempts: {correctAnswers}
          </Text>
          <QuestionComponent question={question} />
          <TextComponent answer={userAnswer} setAnswer={setUserAnswer} onSubmit={validateAnswer} />
          {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
        </View>
        <View style={styles.bottomContent}>
          <CountdownTimer key={timerKey} duration={30} onTimeUp={handleTimeUp} isActive={timerActive} />
          <ButtonComponent onPress={validateAnswer} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#000000' },
  container: { flex: 1, backgroundColor: '#000000', paddingTop: 40, justifyContent: 'space-between' },
  topContent: { width: '100%' },
  bottomContent: { width: '100%', paddingBottom: 30, marginTop: 'auto' },
  title: {
    color: '#ACADB9',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins'
  }
});
