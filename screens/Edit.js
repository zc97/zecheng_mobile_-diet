import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddActivity from './AddActivity'

export default function Edit() {
  return (
    <View style={styles.editContainer}>
      <AddActivity></AddActivity>
    </View>
  )
}

const styles = StyleSheet.create({
  editContainer: {
    flex: 1,
  },
})