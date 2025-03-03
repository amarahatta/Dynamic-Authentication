import { View, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'

const TextComponent = () => {
  return (
    <View style={styles.inputContainer}>

      <TextInput placeholder='Type your answer here' placeholderTextColor='#C2C3CB' style={styles.textCom} />

      <Image style={styles.submitVector} source={require('../assets/Vector.png')} />

    </View>
  )
}

export default TextComponent

const styles = StyleSheet.create({

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B1E20',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 15,
  },

  textCom: {
    fontFamily: 'Poppins',
    color: 'white',
    fontSize: 15,
    backgroundColor: '#1B1E20',
    marginHorizontal: 10
  },

  submitVector: {
    marginRight: 10
  }

})