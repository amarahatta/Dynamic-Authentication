import React, { useState } from 'react';
import QuestionScreen from '../screens/QuestionScreen';
import LockScreen from '../screens/LockScreen';
import ValidationScreen from '../screens/ValidationScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'question' | 'lock' | 'validated'>('question');
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  // Function to handle incorrect attempts in QuestionScreen
  const handleIncorrectAttempt = () => {
    setIncorrectAttempts((prev) => prev + 1);
  };

  const handleValidationSuccess = () => {
    setCurrentScreen('validated');
  };

  const resetIncorrectAttempts = () => {
    setIncorrectAttempts(0);
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
        />
      ) : currentScreen === 'lock' ? (
        <LockScreen
          switchToQuestionScreen={() => setCurrentScreen('question')}
          incorrectAttempts={incorrectAttempts}
        />
      ) : (
        <ValidationScreen />
      )}
    </>
  );
}
