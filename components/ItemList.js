import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext} from 'react'
import Item from './Item'
import { ActivitiesContext } from '../contexts/ActivitiesContext'


export default function ItemList({ type }) {
	const { activities, setActivities } = useContext(ActivitiesContext);
	
	return (
		<View>
			<FlatList
				data={activities}
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