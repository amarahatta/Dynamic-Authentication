import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AnswerOptionsComponent = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Reset selection when options change (new question loaded)
  useEffect(() => {
    setSelectedOption(null);
  }, [options]);

  const handleSelection = (index) => {
    setSelectedOption(index);
    onSelect(index);
  };

  const isSelected = (index) => {
    return selectedOption === index;
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            isSelected(index) && styles.selectedOption
          ]}
          onPress={() => handleSelection(index)}
        >
          <View style={styles.optionContent}>
            <View style={[
              styles.indicator,
              isSelected(index) && styles.selectedIndicator
            ]} />
            <Text style={[
              styles.optionText,
              isSelected(index) && styles.selectedText
            ]}>
              {option}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  optionButton: {
    backgroundColor: '#1B1E20',
    padding: 25,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#2A2A2A',
    borderColor: '#4B9CD6',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
  },
  selectedIndicator: {
    backgroundColor: '#4B9CD6',
    borderColor: '#4B9CD6',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    flex: 1,
  },
  selectedText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AnswerOptionsComponent;