import { Button, StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList} from 'react-native'
import React, {useLayoutEffect, useState, useContext} from 'react'
import ItemList from '../components/ItemList'
import { ThemeContext } from '../contexts/ThemeContext';

// Screen that displays a list of activities
export default function Activities({ navigation }) {
  const { theme } = useContext(ThemeContext)

  // Add a button to the header that navigates to the Add An Activity screen
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Button
						title='add'
						onPress={() => {
              navigation.navigate('Add An Activity')
						}}
					/>
				)
			}
		})
	}, [navigation])

  return (
    <SafeAreaView style={[styles.activitiesContainer, {backgroundColor: theme.backgroundColor}]}>
      {/* Display a list of activities */}
      <ItemList type='activities'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activitiesContainer: {
    flex: 1,
  },
})