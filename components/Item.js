import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import AppStyles from '../styles/AppStyles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// Component that displays an item (activity or diet item)
export default function Item({ itemData, type }) {
	// const[ warn, setWarn ] = useState(false);
	const navigation = useNavigation();

	// Check if the item should be warned
	// useEffect(() => {
	// 	if (type === 'activities' &&
	// 		parseInt(itemData.time.replace(' mins', '')) > 60 && 
	// 		(itemData.activity === 'Running' || itemData.activity === 'Weights')) {
	// 			setWarn(true);
	// 	}
	// 	else if (type === 'diet' &&
	// 		parseInt(itemData.calories) > 800) {
	// 			setWarn(true);
	// 	} else {
	// 		setWarn(false);
	// 	}
	// }, [itemData]);

	const handleEdit = () => {
		if (type === 'activities')
			navigation.navigate('AddActivity', { data: itemData, mode: 'edit' });
		else
			navigation.navigate('AddDiet', { data: itemData,  mode: 'edit' });
  };

	return (
		<Pressable onPress={handleEdit}>
			<View style={styles.itemContainer}>
				<View style={styles.nameContainer}>
					<Text style= {styles.itemName}>
						{(type === 'activities') ? itemData.activity : itemData.description}
					</Text>
					{itemData.warn && <Ionicons style={styles.warning} name="warning" size={24} color="orange" />}
				</View>
				<View style = {styles.dateContainer}>
					<Text>
						{itemData.date}
					</Text>
				</View>
				<View style = {styles.timeCaloriesContainer}>
					<Text>
						{(type === 'activities') ? itemData.time : itemData.calories}
					</Text>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		backgroundColor: AppStyles.themeColor,
		alignItems: "center",
		borderWidth: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		shadowColor: 'gray',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		borderRadius: AppStyles.standardBorderRadius,
	},
	nameContainer: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 5,
	},
	itemName: {
		fontSize: AppStyles.standardFontSize,
		color: 'white',
	},
	warning: {
	},
	dateContainer: {
		flex: 2,
		backgroundColor: 'white',
		margin: 5,
		padding: 5,
	},
	timeCaloriesContainer: {
		flex: 1,
		backgroundColor: 'white',
		margin: 5,
		padding: 5,
	}
})