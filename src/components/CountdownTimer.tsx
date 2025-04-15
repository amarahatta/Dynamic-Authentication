import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CountdownTimer = ({ duration = 30, onTimeUp, isActive = true }) => {
  const [timeRemaining, setTimeRemaining] = React.useState(duration);
  const animationValue = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      startTimer();
      startAnimation();
    } else {
      clearInterval(timerRef.current);
      animationValue.stopAnimation();
    }

    return () => clearInterval(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    // Reset timer if duration changes
    if (isActive) {
      resetTimer();
    }
  }, [duration]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimeRemaining(duration);
    animationValue.setValue(1);
    startTimer();
    startAnimation();
  };

  // Calculate width of progress bar based on animation value
  const widthInterpolated = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{timeRemaining}s</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: widthInterpolated },
            timeRemaining < 10 ? styles.urgentProgressBar : null
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    width: '80%',
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  urgentProgressBar: {
    backgroundColor: '#FF3B30',
  }
});

export default CountdownTimer;