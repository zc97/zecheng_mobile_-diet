import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useLayoutEffect, useContext} from 'react'
import ItemList from '../components/ItemList'
import { ThemeContext } from '../contexts/ThemeContext'


export default function Diet({ navigation }) {
  const { theme } = useContext(ThemeContext)
  
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
      <ItemList type = 'diet'/>
    </View>
  )
}

const styles = StyleSheet.create({
  dietContainer: {
    flex: 1,
  },
})