import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import PressableButton from '../components/pressableButton';
import AppStyles from '../styles/AppStyles';
import DateTimeSelector from '../components/DateTimeSelector';
import { ThemeContext } from '../contexts/ThemeContext';
import { writeToDB, updateItem, deleteItem } from '../firebase/firestoreHelper';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';


// Screen that allows the user to add an activity
export default function AddActivity({ navigation, route }) {
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
	const [showDate, setShowDate] = useState(false);
	const [warn, setWarn] = useState(false);
	const [ignoreWarn, setIgnoreWarn] = useState(false);
	const [showIgnoreWarnCheck, setShowIgnoreWarnCheck] = useState(false);

	// initialize the screen with the data and header options
	useEffect(() => {
		if (route.params?.data) {
			navigation.setOptions({ 
        title: 'Edit',
        headerRight: () => (
					<PressableButton pressedFunction={deleteAlter} componentStyle={styles.deleteButton}>
						<Ionicons name="trash" size={23} color={AppStyles.lightTabIconColor} />
					</PressableButton>
        ),
      });
			const data = route.params.data;
			setActivity(data.activity);
			setDuration(data.time.replace(' mins', ''));
			setDate(new Date(data.date));
			setShowIgnoreWarnCheck(data.warn);
		} else {
			navigation.setOptions({ title: 'Add An Activity' });
		}
	}, []);

	const isNumber = (value) => {
		return /^\d+$/.test(value);
	}

	const deleteAlter = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this activity?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: handleDeleteActivity,
          style: "destructive"
        }
      ]
    );
  };

	// Delete the activity item from the activity list
	const handleDeleteActivity = async () => {
    if (route.params?.data) {
      await deleteItem(route.params.data.id, 'activities');
      navigation.navigate('Activities');
    }
  };

	// Save the activity item to the activity list
	const handleSaveActivity = async () => {
		// Check if all values are valid
		if (!activity || !isNumber(duration) || !date) {
			Alert.alert(title = 'Invalid Input', messafe = 'Please check your input values');
			return;
		}

		// Check if the user is editing an existing activity item
		if (route.params?.data) {
			// Update the activity item
			const updateActivity = await updateItem(route.params.data.id, {
				activity: activity,
				date: date.toDateString(),
				time: duration + ' mins',
				warn: (ignoreWarn) ? false : warn,
			}, 'activities');
		} else {
			const addActivityToDB = await writeToDB({
				activity: activity,
				date: date.toDateString(),
				time: duration + ' mins',
				warn: warn,
			}, 'activities');
		}
		navigation.navigate('Activities');
	}

	const handleDurationChange = (value) => {
		setDuration(value);
		// Check if the user is running or lifting weights for more than 60 minutes
		if (
			parseInt(value) > 60 &&
			(activity === 'Running' || activity === 'Weights')) {
			setWarn(true);
		} else {
			setWarn(false);
		}
	}

	return (
		<View style={[styles.addActivityContainer, { backgroundColor: theme.backgroundColor }]}>
			<Text style={[styles.inputLabel, { color: theme.textColor }]}>Select An Activity *</Text>
			<DropDownPicker
				open={open}
				value={activity}
				items={items}
				setOpen={setOpen}
				setValue={setActivity}
				setItems={setItems}
			/>

			<Text style={[styles.inputLabel, { color: theme.textColor }]}>Duration (min)  *</Text>
			<TextInput
				style={styles.inputField}
				value={duration}
				onChangeText={handleDurationChange}
				placeholder="Enter duration in minutes"
				keyboardType="numeric"
			/>

			{/* Display the customized DateTimeSelector component */}
			<DateTimeSelector date={date} setDate={setDate} showDate={showDate} setShowDate={setShowDate}></DateTimeSelector>

			<View style={styles.bottomContainer}>
				{showIgnoreWarnCheck &&
					<View style={styles.checkboxContainer}>
						<Text style={styles.inputLabel}>This item is marked as special Select the checkbox if you would like to approve it.</Text>
						<Checkbox
							style={styles.checkBox}
							value={ignoreWarn}
							onValueChange={setIgnoreWarn}
						/>
					</View>
				}

				<View style={styles.buttonContainer}>
					<PressableButton
						pressedFunction={handleSaveActivity}
					>
						<Text style={styles.buttonText}>Save</Text>
					</PressableButton>
					<PressableButton
						pressedFunction={() => navigation.goBack()}
						componentStyle={{backgroundColor : 'red'}}
					>
						<Text style={styles.buttonText}>Cancel</Text>
					</PressableButton>
				</View>
			</View>

		</View>
	)
}

const styles = StyleSheet.create({
	addActivityContainer: {
		flex: 1,
		padding: 15,
	},
	deleteButton: {
		padding: 0,
	},
	inputLabel: {
		marginVertical: 10,
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
	bottomContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	buttonText: {
		color: AppStyles.pressableButtonFontColor,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: AppStyles.standardPadding - 5,
	},
	checkBox: {
		margin: 10,
	},
})