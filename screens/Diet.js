import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useLayoutEffect} from 'react'


export default function Diet({ navigation }) {

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
    <View>
      <Text>Diet</Text>
    </View>
  )
}

const styles = StyleSheet.create({})