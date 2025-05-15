import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import AnswerOptionsComponent from '../components/AnswerOptionComponent';
import ButtonComponent from '../components/ButtonComponent';
import CountdownTimer from '../components/CountdownTimer';

type MultipleChoiceScreenProps = {
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

const MultipleChoiceScreen = ({
  switchToLockScreen,
  handleIncorrectAttempt,
  handleValidationSuccess,
  incorrectAttempts,
  resetIncorrectAttempts,
  switchToNextScreen,
  handleCorrectAnswer,
  handleIncorrectAnswer,
  correctAnswers
}: MultipleChoiceScreenProps) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [timerActive, setTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = Constants.expoConfig?.extra?.BACKEND_URL;

  const generateQuestion = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`${backendUrl}/generate-question`);
    const data = await response.json();

    if (
      data.question &&
      data.answer_a &&
      data.answer_b &&
      data.answer_c &&
      data.answer_d &&
      data.correct_answer
    ) {
      setQuestion(data.question);
      const optionMap = {
        answer_a: data.answer_a,
        answer_b: data.answer_b,
        answer_c: data.answer_c,
        answer_d: data.answer_d
      };
      setOptions([
        data.answer_a,
        data.answer_b,
        data.answer_c,
        data.answer_d
      ]);
      setCorrectOption(optionMap[data.correct_answer]);
    } else {
      throw new Error("Invalid response from backend");
    }
  } catch (error) {
    console.error("Failed to fetch question:", error);
    setQuestion("Which of these is a good password practice?");
    setOptions([
      "Using the same password for all accounts",
      "Using a combination of letters, numbers, and symbols",
      "Using your birth date",
      "Sharing your password with friends"
    ]);
    setCorrectOption("Using a combination of letters, numbers, and symbols");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    generateQuestion();
  }, []);

  const handleTimeUp = () => {
    setTimerActive(false);
    setFeedback("Time's up! Moving to next question.");
    handleIncorrectAnswer();
    handleIncorrectAttempt();
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback('');
      setTimerKey(prev => prev + 1);
      setTimerActive(true);
      generateQuestion();
      switchToNextScreen();
    }, 1000);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const validateAnswer = () => {
    if (selectedOption === null) {
      setFeedback('Please select an option first.');
      return;
    }

    const selectedText = options[selectedOption];
    const isCorrect = selectedText === correctOption;

    if (isCorrect) {
      setFeedback('Correct Answer');
      setTimerActive(false);
      handleCorrectAnswer();
      resetIncorrectAttempts();
      setTimeout(() => {
        setSelectedOption(null);
        setFeedback('');
        setTimerKey(prev => prev + 1);
        setTimerActive(true);
        generateQuestion();
        switchToNextScreen();
      }, 1000);
    } else {
      setFeedback('Incorrect Answer.');
      setTimerActive(false);
      handleIncorrectAnswer();

      if (incorrectAttempts < 2) {
        handleIncorrectAttempt();
        setTimeout(() => {
          setSelectedOption(null);
          setFeedback('');
          setTimerKey(prev => prev + 1);
          setTimerActive(true);
          generateQuestion();
          switchToNextScreen();
        }, 1000);
      } else {
        handleIncorrectAttempt();
        switchToLockScreen(incorrectAttempts + 1);
      }
    }
  };

  const handleSubmit = () => {
    validateAnswer();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.topContent}>
          <Text style={styles.title}>Answer the questions to regain access</Text>
          <Text style={styles.title}>
            Incorrect attempts: {incorrectAttempts} Correct attempts: {correctAnswers}
          </Text>

          {isLoading ? (
            <Text style={styles.loadingText}>Loading question...</Text>
          ) : (
            <>
              <Text style={styles.questionText}>{question}</Text>
              <AnswerOptionsComponent options={options} onSelect={handleOptionSelect} />
              {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
            </>
          )}
        </View>
        <View style={styles.bottomContent}>
          <CountdownTimer key={timerKey} duration={30} onTimeUp={handleTimeUp} isActive={timerActive} />
          <ButtonComponent onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MultipleChoiceScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000'
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topContent: {
    width: '100%'
  },
  bottomContent: {
    width: '100%',
    paddingBottom: 30,
    marginTop: 'auto'
  },
  title: {
    color: '#ACADB9',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 30
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins'
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins'
  }
});
