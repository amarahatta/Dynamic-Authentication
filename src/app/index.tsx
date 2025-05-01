import React, { useState } from 'react';
import QuestionScreen from '../screens/QuestionScreen';
import LockScreen from '../screens/LockScreen';
import ValidationScreen from '../screens/ValidationScreen';
import MultipleChoiceScreen from '../screens/MultipleChoiceScreen';


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'question' | 'multipleChoice' | 'lock' | 'validated'>('question');
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [consecutiveCorrectAnswers, setConsecutiveCorrectAnswers] = useState(0);

  const handleIncorrectAttempt = () => {
    setIncorrectAttempts((prev) => prev + 1);
    setConsecutiveCorrectAnswers(0);
    if (incorrectAttempts + 1 >= 3) {
      setCurrentScreen('lock');
    }
  };

  const handleValidationSuccess = () => {
    setCurrentScreen('validated');
  };

  const resetIncorrectAttempts = () => {
    setIncorrectAttempts(0);
  };

  const resetCorrectAnswers = () => {
    setCorrectAnswers(0);
    setConsecutiveCorrectAnswers(0);
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswers(prev => prev + 1);
    setConsecutiveCorrectAnswers(prev => prev + 1);   
    if (consecutiveCorrectAnswers + 1 >= 3 || correctAnswers + 1 >= 3) {
      handleValidationSuccess();
    }
  };

  const handleIncorrectAnswer = () => {
    setConsecutiveCorrectAnswers(0);
    if (correctAnswers > 0) {
      setCorrectAnswers(prev => prev - 1);
    }
  };

  // Randomly select next screen
  const getNextScreen = () => {
    return Math.random() < 0.5 ? 'question' : 'multipleChoice';
  };

  const switchToNextScreen = () => {
    setCurrentScreen(getNextScreen());
  };

  return (
    <>
      {currentScreen === 'question' ? (
        <QuestionScreen
          switchToLockScreen={() => setCurrentScreen('lock')}
          handleIncorrectAttempt={handleIncorrectAttempt}
          handleValidationSuccess={handleValidationSuccess}
          incorrectAttempts={incorrectAttempts}
          resetIncorrectAttempts={resetIncorrectAttempts}
          switchToNextScreen={switchToNextScreen}
          handleCorrectAnswer={handleCorrectAnswer}
          handleIncorrectAnswer={handleIncorrectAnswer}
          correctAnswers={correctAnswers}
        />
      ) : currentScreen === 'multipleChoice' ? (
        <MultipleChoiceScreen
          switchToLockScreen={() => setCurrentScreen('lock')}
          handleIncorrectAttempt={handleIncorrectAttempt}
          handleValidationSuccess={handleValidationSuccess}
          incorrectAttempts={incorrectAttempts}
          resetIncorrectAttempts={resetIncorrectAttempts}
          switchToNextScreen={switchToNextScreen}
          handleCorrectAnswer={handleCorrectAnswer}
          handleIncorrectAnswer={handleIncorrectAnswer}
          correctAnswers={correctAnswers}
        />
      ) : currentScreen === 'lock' ? (
        <LockScreen
          switchToQuestionScreen={() => setCurrentScreen(getNextScreen())}
          incorrectAttempts={incorrectAttempts}
        />
      ) : (
        <ValidationScreen 
          resetIncorrectAttempts={resetIncorrectAttempts}
          resetCorrectAnswers={resetCorrectAnswers}
        />
      )}
    </>
  );
}
