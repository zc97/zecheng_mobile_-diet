import { Button, StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList} from 'react-native'
import React, {useLayoutEffect, useState, useContext} from 'react'
import ItemList from '../components/ItemList'
import { ThemeContext } from '../contexts/ThemeContext';


export default function Activities({ navigation }) {
  const { theme } = useContext(ThemeContext)

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
      <ItemList type='activities'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activitiesContainer: {
    flex: 1,
  },
})