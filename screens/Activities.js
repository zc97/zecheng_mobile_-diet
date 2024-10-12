import { Button, StyleSheet, Text, View } from 'react-native'
import React, {useLayoutEffect} from 'react'
import ItemList from '../components/ItemList'

export default function Activities({ navigation }) {
  
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<Button
						title='add'
						onPress={() => {
              navigation.navigate('AddActivity')
						}}
					/>
				)
			}
		})
	}, [navigation])

  return (
    <View styles={styles}>
      <ItemList/>
    </View>
  )
}

const styles = StyleSheet.create({})