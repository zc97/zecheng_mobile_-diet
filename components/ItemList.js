import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Item from './Item'

export default function ItemList({ type }) {
	// test data
	const testData =  [
		{'activity': 'Running', 'date': '2024-09-01', 'time': 30},
		{'activity': 'Swimming', 'date': '2024-09-01', 'time': 40},
		{'activity': 'Cycling', 'date': '2024-09-01', 'time': 20},
	]

	return (
		<View>
			<FlatList
				data={testData}
				renderItem={({ item }) => <Item itemData={item}/>}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	itemList: {
		flexDirection: "row",
	}
})