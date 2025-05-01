import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AnswerOptionsComponent from '../components/AnswerOptionComponent';
import ButtonComponent from '../components/ButtonComponent';
import CountdownTimer from '../components/CountdownTimer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';


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
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timerActive, setTimerActive] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [prevQuestion, setPrevQuestion] = useState("");

  // Initialize Gemini API
  const geminiKey = Constants.expoConfig?.extra?.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const selectRandomCategory = async () => {
    const categories = [
      "technology",
      "cyber security",
      "digital privacy",
      "smartphone usage",
      "computer basics"
    ];

    let randomIndex = Math.floor(Math.random() * categories.length);
    let selectedCategory = categories[randomIndex];

    // Avoid repeating the same category
    while (prevQuestion.includes(selectedCategory)) {
      randomIndex = Math.floor(Math.random() * categories.length);
      selectedCategory = categories[randomIndex];
    }

    setPrevQuestion(selectedCategory);
    return selectedCategory;
  };

  const generateQuestion = async () => {
    try {
      setIsLoading(true);
      setSelectedOption(null);
      const category = await selectRandomCategory();
      const prompt = `Generate a multiple choice question about ${category} with exactly 4 answer options. Format the response as:
      Question: [your question]
      Options:
      A) [option A]
      B) [option B]
      C) [option C]
      D) [option D]
      Correct Answer: [letter of correct option]`;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      //Extract question, options, and correct answer
      const lines = responseText.split('\n');
      const questionLine = lines.find(line => line.startsWith('Question:'));
      const optionsLines = lines.filter(line => line.match(/^[A-D]\)/));
      const correctAnswerLine = lines.find(line => line.startsWith('Correct Answer:'));

      if (questionLine && optionsLines.length === 4 && correctAnswerLine) {
        const questionText = questionLine.replace('Question:', '').trim();
        const optionsText = optionsLines.map(line => line.split(')')[1].trim());
        const correctAnswerLetter = correctAnswerLine.replace('Correct Answer:', '').trim();
        const correctAnswerIndex = correctAnswerLetter.charCodeAt(0) - 'A'.charCodeAt(0);

        setQuestion(questionText);
        setOptions(optionsText);
        setCorrectOption(optionsText[correctAnswerIndex]);
      } else {
        // Fallback question
        setQuestion("Which of these is a good password practice?");
        setOptions([
          "Using the same password for all accounts",
          "Using a combination of letters, numbers, and symbols",
          "Using your birth date",
          "Sharing your password with friends"
        ]);
        setCorrectOption("Using a combination of letters, numbers, and symbols");
      }
    } catch (error) {
      console.error("Error generating question:", error);
      // Fallback question 
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
      setFeedback("");
      setTimerKey(prev => prev + 1);
      setTimerActive(true);
      generateQuestion();
      switchToNextScreen();
    }, 1000);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const validateAnswer = async () => {
    if (selectedOption === null) {
      setFeedback("Please select an option first.");
      return;
    }

    const selectedText = options[selectedOption];
    const isCorrect = selectedText === correctOption;

    if (isCorrect) {
      setFeedback("Correct Answer");
      setTimerActive(false);
      handleCorrectAnswer();
      resetIncorrectAttempts();

      setTimeout(() => {
        setSelectedOption(null);
        setFeedback("");
        setTimerKey(prev => prev + 1);
        setTimerActive(true);
        generateQuestion();
        switchToNextScreen();
      }, 1000);
    } else {
      setFeedback("Incorrect Answer.");
      setTimerActive(false);
      handleIncorrectAnswer();

      if (incorrectAttempts < 2) {
        handleIncorrectAttempt();

        setTimeout(() => {
          setSelectedOption(null);
          setFeedback("");
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
          <Text style={styles.title}>Incorrect attempts: {incorrectAttempts} Correct attempts: {correctAnswers}</Text>

          {isLoading ? (
            <Text style={styles.loadingText}>Loading question...</Text>
          ) : (
            <>
              <Text style={styles.questionText}>{question}</Text>
              <AnswerOptionsComponent
                options={options}
                onSelect={handleOptionSelect}
              />
              {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
            </>
          )}
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

export default MultipleChoiceScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  questionText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 30,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Poppins',
  },
});



