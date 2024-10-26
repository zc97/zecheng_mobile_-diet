import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import PressableButton from '../components/pressableButton';
import AppStyles from '../styles/AppStyles';
import DateTimeSelector from '../components/DateTimeSelector';
import { ThemeContext } from '../contexts/ThemeContext';
import { writeToDB } from '../firebase/firestoreHelper';

// Screen that allows the user to add a diet
export default function AddDiet({ navigation }) {
	const { theme } = useContext(ThemeContext);

	const [description, setDescription] = useState('');
	const [calories, setCalories] = useState('');
	const [date, setDate] = useState(null);

	const isNumber = (value) => {
		return /^\d+$/.test(value);
	}

	// Save the diet item to the diet list
	const handleSaveDiet = async () => {
		// Check if all values are valid
		if (!description || !isNumber(calories) || !date) {
			Alert.alert(title = 'Invalid Input', messafe = 'Please check your input values');
			return;
		}

		const addDietToDB = await writeToDB({	
			description: description, 
			date: date.toDateString(), 
			calories: calories }, 
			'diet');

		// setDiet((diet) =>
		// 	[...diet, {
		// 		id: diet.length + 1,
		// 		description: description,
		// 		date: date.toDateString(),
		// 		calories: calories,
		// 	}
		// 	])
		navigation.navigate('Diet')
	}

	return (
		<View style={[styles.addDeitContainer, {backgroundColor: theme.backgroundColor}]}>
			<Text style={[styles.inputLabel, {color: theme.textColor}]}>Description *</Text>
				<TextInput
					style={styles.descriptionInputField}
					value={description}
					onChangeText={setDescription}
					multiline={true}
				/>

			<Text style={[styles.inputLabel, {color: theme.textColor}]}>Calories *</Text>
			<TextInput
				style={styles.durationInputField}
				value={calories}
				onChangeText={setCalories}
				placeholder="Enter duration in minutes"
				keyboardType="numeric"
			/>

			{/* Display the customized DateTimeSelector component */}
			<DateTimeSelector date={date} setDate={setDate}></DateTimeSelector>

			<View style={styles.buttonContainer}>
				<PressableButton
					pressedFunction={handleSaveDiet}
				>
					<Text style={styles.buttonText}>Save</Text>
				</PressableButton>
				<PressableButton
					pressedFunction={() => navigation.goBack()}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</PressableButton>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	addDeitContainer: {
		flex: 1,
		padding: 20,
	},
	inputLabel:{
		marginTop: 20,
		marginBottom: 5,
		marginHorizontal: 5,
		fontWeight: 'bold',
		color: AppStyles.themeColor,
	},
	descriptionInputField: {
		height: 80,
		marginHorizontal: 5,
		borderWidth: 1,
		borderRadius: AppStyles.standardBorderRadius,
		padding: AppStyles.standardPadding,
		backgroundColor: 'white',
	},
	durationInputField: {
		marginHorizontal: 5,
		borderWidth: 1,
		borderRadius: AppStyles.standardBorderRadius,
		padding: AppStyles.standardPadding,
		backgroundColor: 'white',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end',
	},
	buttonText: {
		color: AppStyles.pressableButtonFontColor,
	}
})