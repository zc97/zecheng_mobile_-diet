import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Item from './Item'

export default function ItemList({ type }) {
	// test data
	const testData =  ['Running', 'Swimming', 'Cycling']

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