import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useLayoutEffect, useContext, useEffect, useState} from 'react'
import ItemList from '../components/ItemList'
import { ThemeContext } from '../contexts/ThemeContext'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase/firebaseSetup'
import AntDesign from '@expo/vector-icons/AntDesign'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AppStyles from '../styles/AppStyles'
import PressableButton from '../components/pressableButton'

// Screen that displays a list of diet items
export default function Diet({ navigation }) {
  const { theme } = useContext(ThemeContext)
	const [diet, setDiet] = useState([]);
  
  // Add a button to the header that navigates to the AddDiet screen
  useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<PressableButton 
						pressedFunction={
							() => navigation.navigate('AddDiet')
						} 
						componentStyle={styles.addButton}>
						<AntDesign name="plus" size={23} color={AppStyles.lightTabIconColor} />
						<MaterialIcons name="fastfood" size={24} color={AppStyles.lightTabIconColor} />
					</PressableButton>
				)
			}
		})
	}, [navigation])

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(database, 'diet'), (snapshot) => {
			const dietData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setDiet(dietData);
		});
		return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.dietContainer, {backgroundColor: theme.backgroundColor}]}>
      {/* Display a list of diet items */}
      <ItemList type = 'diet' items={diet}/>
    </View>
  )
}

const styles = StyleSheet.create({
  dietContainer: {
    flex: 1,
  },
	addButton: {
		flexDirection: 'row',
		margin: 0,
		padding: 5,
		backgroundColor: AppStyles.themeColor,
		borderRadius: AppStyles.standardBorderRadius,
	}
})