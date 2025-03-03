import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const TextComponent = ({ answer, setAnswer, onSubmit }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder='Type your answer here'
        placeholderTextColor='#C2C3CB'
        style={styles.textCom}
        value={answer}
        onChangeText={setAnswer}
      />

      <TouchableOpacity onPress={onSubmit}>
        <Image style={styles.submitVector} source={require('../assets/Vector.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B1E20',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 15,
    marginTop: 20,
  },
  textCom: {
    fontFamily: 'Poppins',
    color: 'white',
    fontSize: 15,
    backgroundColor: '#1B1E20',
    marginHorizontal: 10,
    flex: 1,
  },
  submitVector: {
    marginRight: 10,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
