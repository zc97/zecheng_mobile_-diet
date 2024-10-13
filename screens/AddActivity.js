import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { ActivitiesContext } from '../contexts/ActivitiesContext'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import PressableButton from '../components/pressableButton';
import AppStyles from '../styles/AppStyles';
import DateTimeSelector from '../components/DateTimeSelector';

export default function AddActivity({ navigation }) {
	const { activities, setActivities } = useContext(ActivitiesContext);

	const [open, setOpen] = useState(false);
	const [activity, setActivity] = useState(null);
	const [items, setItems] = useState([
		{ label: 'Walking', value: 'Walking' },
		{ label: 'Running', value: 'Running' },
		{ label: 'Yoga', value: 'Yoga' },
		{ label: 'Cycling', value: 'Cycling' },
		{ label: 'Hiking', value: 'Hiking' },
	]);

	const [duration, setDuration] = useState(null);
	const [date, setDate] = useState(new Date());

	const isNumber = (value) => {
		return /^\d+$/.test(value);
	}

	const handleSaveActivity = () => {
		if (!activity || !isNumber(duration) || !date) {
			Alert.alert(title = 'Invalid Input', messafe = 'Please check your input values');
			return;
		}
		setActivities((activities) =>
			[...activities, {
				id: activities.length + 1,
				activity: activity,
				date: date.toDateString(),
				time: duration + ' mins'
			}
			])
		navigation.navigate('Activities')
	}

	return (
		<View style={styles.addActivityContainer}>
			<Text style={styles.inputLabel}>Select An Activity</Text>
				<DropDownPicker
					open={open}
					value={activity}
					items={items}
					setOpen={setOpen}
					setValue={setActivity}
					setItems={setItems}
				/>

			<Text style={styles.inputLabel}>Duration (min)</Text>
			<TextInput
				style={styles.inputField}
				value={duration}
				onChangeText={setDuration}
				placeholder="Enter duration in minutes"
				keyboardType="numeric"
			/>

			<DateTimeSelector date={date} setDate={setDate}></DateTimeSelector>

			<View style={styles.buttonContainer}>
				<PressableButton
					pressedFunction={handleSaveActivity}
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
	addActivityContainer: {
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
	inputField: {
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