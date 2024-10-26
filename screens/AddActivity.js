import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import PressableButton from '../components/pressableButton';
import AppStyles from '../styles/AppStyles';
import DateTimeSelector from '../components/DateTimeSelector';
import { ThemeContext } from '../contexts/ThemeContext';
import { writeToDB } from '../firebase/firestoreHelper';

// Screen that allows the user to add an activity
export default function AddActivity({ navigation }) {
  const { theme } = useContext(ThemeContext)

	const [open, setOpen] = useState(false);
	const [activity, setActivity] = useState(null);
	const [items, setItems] = useState([
		{ label: 'Walking', value: 'Walking' },
		{ label: 'Running', value: 'Running' },
		{ label: 'Swimming', value: 'Swimming' },
		{ label: 'Weights', value: 'Weights' },
		{ label: 'Yoga', value: 'Yoga' },
		{ label: 'Cycling', value: 'Cycling' },
		{ label: 'Hiking', value: 'Hiking' },
	]);

	const [duration, setDuration] = useState(null);
	const [date, setDate] = useState(null);

	const isNumber = (value) => {
		return /^\d+$/.test(value);
	}

	// Save the activity item to the activity list
	const handleSaveActivity = async () => {
		// Check if all values are valid
		if (!activity || !isNumber(duration) || !date) {
			Alert.alert(title = 'Invalid Input', messafe = 'Please check your input values');
			return;
		}
		
		const addActivityToDB = await writeToDB({	
			activity: activity, 
			date: date.toDateString(), 
			time: duration + ' mins' }, 
			'activities');

		// setActivities((activities) =>
		// 	[...activities, {
		// 		id: activities.length + 1,
		// 		activity: activity,
		// 		date: date.toDateString(),
		// 		time: duration + ' mins'
		// 	}
		// 	])
		
		navigation.navigate('Activities');
	}

	return (
		<View style={[styles.addActivityContainer, {backgroundColor: theme.backgroundColor}]}>
			<Text style={[styles.inputLabel, {color: theme.textColor}]}>Select An Activity *</Text>
				<DropDownPicker
					open={open}
					value={activity}
					items={items}
					setOpen={setOpen}
					setValue={setActivity}
					setItems={setItems}
				/>

			<Text style={[styles.inputLabel, {color: theme.textColor}]}>Duration (min)  *</Text>
			<TextInput
				style={styles.inputField}
				value={duration}
				onChangeText={setDuration}
				placeholder="Enter duration in minutes"
				keyboardType="numeric"
			/>

			{/* Display the customized DateTimeSelector component */}
			<DateTimeSelector date={date} setDate={setDate}></DateTimeSelector>

			<View style={styles.buttonContainer}>
				<PressableButton
					pressedFunction={handleSaveActivity}
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
	addActivityContainer: {
		flex: 1,
		padding: AppStyles.standardPadding,
	},
	inputLabel:{
		marginTop: 20,
		marginBottom: 5,
		marginHorizontal: 5,
		fontWeight: 'bold',
		color: AppStyles.themeColor,
	},
	inputField: {
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