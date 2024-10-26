import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import Item from './Item'
import { database } from '../firebase/firebaseSetup'

// Component that displays a flatlist of items (activities or diet items)
export default function ItemList({ type }) {
	const [activities, setActivities] = useState([]);
	const [diet, setDiet] = useState([]);

	useEffect(() => {
		if (type === 'activities') {
			const unsubscribe = onSnapshot(collection(database, 'activities'), (snapshot) => {
				const activitiesData = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setActivities(activitiesData);
			});
			return () => unsubscribe();
		} else {
			const unsubscribe = onSnapshot(collection(database, 'diet'), (snapshot) => {
				const dietData = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setDiet(dietData);
			});
			return () => unsubscribe();
		}
  }, []);

	// Depending on the type of item, display the appropriate list
	if (type === 'activities') {
		// const { activities, setActivities } = useContext(ActivitiesContext);
		return (
			<FlatList
				data={activities}
				renderItem={({ item }) => <Item itemData={item} type='activity'/>}
			/>
		) 
	} else if (type === 'diet') {
		// const { diet, setDiet } = useContext(DietContext);
		return (
			<FlatList
				data={diet}
				renderItem={({ item }) => <Item itemData={item} type='diet' />}
			/>
		) 
	}

}

const styles = StyleSheet.create({})