import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useLayoutEffect, useContext} from 'react'
import ItemList from '../components/ItemList'
import { ThemeContext } from '../contexts/ThemeContext'

// Screen that displays a list of diet items
export default function Diet({ navigation }) {
  const { theme } = useContext(ThemeContext)
  
  // Add a button to the header that navigates to the AddDiet screen
  useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Button
						title='add'
						onPress={() => {
							navigation.navigate('AddDiet')
						}}
					/>
				)
			}
		})
	}, [navigation])

  return (
    <View style={[styles.dietContainer, {backgroundColor: theme.backgroundColor}]}>
      {/* Display a list of diet items */}
      <ItemList type = 'diet'/>
    </View>
  )
}

const styles = StyleSheet.create({
  dietContainer: {
    flex: 1,
  },
})