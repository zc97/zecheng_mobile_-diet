import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState, useContext} from 'react'
import { ActivitiesContext } from '../contexts/ActivitiesContext'

export default function AddActivity() {
	const { activities, setActivities } = useContext(ActivitiesContext);

	return (
		<View>
			<Text>AddActivity</Text>
			<Button title='add' onPress = {() => {setActivities([...activities, { id: '4', activity: 'Running', date: '2023-10-02', time: '10 mins' }])}}></Button>
		</View>
	)
}

const styles = StyleSheet.create({})