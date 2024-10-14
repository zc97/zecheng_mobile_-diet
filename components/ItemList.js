import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext} from 'react'
import Item from './Item'
import { ActivitiesContext } from '../contexts/ActivitiesContext'
import { DietContext } from '../contexts/DietContext'

// Component that displays a flatlist of items (activities or diet items)
export default function ItemList({ type }) {
	// Depending on the type of item, display the appropriate list
	if (type === 'activities') {
		const { activities, setActivities } = useContext(ActivitiesContext);
		return (
			<FlatList
				data={activities}
				renderItem={({ item }) => <Item itemData={item} type='activity'/>}
			/>
		) 
	} else if (type === 'diet') {
		const { diet, setDiet } = useContext(DietContext);
		return (
			<FlatList
				data={diet}
				renderItem={({ item }) => <Item itemData={item} type='diet' />}
			/>
		) 
	}

}

const styles = StyleSheet.create({})