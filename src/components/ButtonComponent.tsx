import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonComponent = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonTitle}>Next</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
  button: {
    height: 65,
    borderRadius: 15,
    backgroundColor: '#1B1E20',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },

  buttonTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#FFFFFF',
  }

})