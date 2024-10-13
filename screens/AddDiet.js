import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from '../components/pressableButton';
import AppStyles from '../styles/AppStyles';
import DateTimeSelector from '../components/DateTimeSelector';
import { DietContext } from '../contexts/DietContext';

export default function AddDiet({ navigation }) {
	const { diet, setDiet } = useContext(DietContext);

	const [description, setDescription] = useState('');
	const [calories, setCalories] = useState('');
	const [date, setDate] = useState(new Date());

	const isNumber = (value) => {
		return /^\d+$/.test(value);
	}

	const handleSaveDiet = () => {
		if (!description || !isNumber(calories) || !date) {
			Alert.alert(title = 'Invalid Input', messafe = 'Please check your input values');
			return;
		}
		setDiet((diet) =>
			[...diet, {
				id: diet.length + 1,
				description: description,
				date: date.toDateString(),
				calories: calories,
			}
			])
		navigation.navigate('Diet')
	}

	return (
		<View style={styles.addDeitContainer}>
			<Text style={styles.inputLabel}>Description *</Text>
				<TextInput
					style={styles.descriptionInputField}
					value={description}
					onChangeText={setDescription}
					multiline={true}
				/>

			<Text style={styles.inputLabel}>Calories *</Text>
			<TextInput
				style={styles.durationInputField}
				value={calories}
				onChangeText={setCalories}
				placeholder="Enter duration in minutes"
				keyboardType="numeric"
			/>

			<DateTimeSelector date={date} setDate={setDate}></DateTimeSelector>

			<View style={styles.buttonContainer}>
				<PressableButton
					pressedFunction={handleSaveDiet}
				>
					<Text>Save</Text>
				</PressableButton>
				<PressableButton
					pressedFunction={() => navigation.goBack()}
				>
					<Text>Cancel</Text>
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
		borderRadius: 5,
		padding: 5,
		backgroundColor: 'white',
	},
	durationInputField: {
		marginHorizontal: 5,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		backgroundColor: 'white',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
	}
})