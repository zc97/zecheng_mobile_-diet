import { Button, StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList} from 'react-native'
import React, {useLayoutEffect, useState, useContext, useEffect} from 'react'
import ItemList from '../components/ItemList'
import { ThemeContext } from '../contexts/ThemeContext';
import { database } from '../firebase/firebaseSetup';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';


// Screen that displays a list of activities
export default function Activities() {
  const { theme } = useContext(ThemeContext)
	const [activities, setActivities] = useState([]);
	const navigation = useNavigation();

  // Add a button to the header that navigates to the Add An Activity screen
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


	useEffect(() => {
		const unsubscribe = onSnapshot(collection(database, 'activities'), (snapshot) => {
			const activitiesData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setActivities(activitiesData);
		});
		return () => unsubscribe();
  }, []);


  return (
    <SafeAreaView style={[styles.activitiesContainer, {backgroundColor: theme.backgroundColor}]}>
      {/* Display a list of activities */}
      <ItemList type='activities' items={activities}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activitiesContainer: {
    flex: 1,
  },
})