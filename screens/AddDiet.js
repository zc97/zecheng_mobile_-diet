import { StyleSheet, Text, View, TextInput, Alert, Pressable } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import PressableButton from '../components/pressableButton';
import AppStyles from '../styles/AppStyles';
import DateTimeSelector from '../components/DateTimeSelector';
import { ThemeContext } from '../contexts/ThemeContext';
import { writeToDB, updateItem, deleteItem } from '../firebase/firestoreHelper';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';


// Screen that allows the user to add a diet
export default function AddDiet({ navigation, route }) {
	const { theme } = useContext(ThemeContext);

	const [description, setDescription] = useState('');
	const [calories, setCalories] = useState('');
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
					<PressableButton pressedFunction={handleDeleteDiet} componentStyle={styles.deleteButton}>
						<Ionicons name="trash" size={23} color={AppStyles.lightTabIconColor} />
					</PressableButton>
        ),
      });
			const data = route.params.data;
			setDescription(data.description);
			setCalories(data.calories);
			setDate(new Date(data.date));
			setShowIgnoreWarnCheck(data.warn);
		} else {
			navigation.setOptions({ title: 'Add A Diet' });
		}
	}, []);

	const isNumber = (value) => {
		return /^\d+$/.test(value);
	}

		// Delete the activity item from the activity list
		const handleDeleteDiet = async () => {
			if (route.params?.data) {
				await deleteItem(route.params.data.id, 'diet');
				navigation.navigate('Diet');
			}
		};

	// Save the diet item to the diet list
	const handleSaveDiet = async () => {
		// Check if all values are valid
		if (!description || !isNumber(calories) || !date) {
			Alert.alert(title = 'Invalid Input', messafe = 'Please check your input values');
			return;
		}

		if (route.params?.data) {
			const updateDiet = await updateItem(route.params.data.id, {
				description: description,
				date: date.toDateString(),
				calories: calories,
				warn: (ignoreWarn) ? false : warn,
			}, 'diet');
		} else {
			const addDietToDB = await writeToDB({
				description: description,
				date: date.toDateString(),
				calories: calories,
				warn: warn,
			},
				'diet');
		}
		navigation.navigate('Diet')
	}

	const handleCloriesChange = (value) => {
		setCalories(value);
		if (parseInt(value) > 800) {
			setWarn(true);
		} else {
			setWarn(false);
		}
	}

	return (
		<View style={[styles.addDeitContainer, { backgroundColor: theme.backgroundColor }]}>
			<View style={styles.topContainer}>
				<Text style={[styles.inputLabel, { color: theme.textColor }]}>Description *</Text>
				<TextInput
					style={styles.descriptionInputField}
					value={description}
					onChangeText={setDescription}
					multiline={true}
				/>

				<Text style={[styles.inputLabel, { color: theme.textColor }]}>Calories *</Text>
				<TextInput
					style={styles.durationInputField}
					value={calories}
					onChangeText={handleCloriesChange}
					placeholder="Enter Food Clories"
					keyboardType="numeric"
				/>

				{/* Display the customized DateTimeSelector component */}
				<DateTimeSelector date={date} setDate={setDate} showDate={showDate} setShowDate={setShowDate}></DateTimeSelector>
			</View>

			{!showDate && (
				<View style={styles.bottomContainer}>
					<View style={styles.checkboxContainer}>
						{showIgnoreWarnCheck &&
							<View style={styles.checkboxContainer}>
								<Text style={styles.inputLabel}>This item is marked as special Select the checkbox if you would like to approve it.
								</Text>
								<Checkbox
									style={styles.checkBox}
									value={ignoreWarn}
									onValueChange={setIgnoreWarn}
								/>
							</View>
						}
					</View>

					<View style={styles.buttonContainer}>
						<PressableButton
							pressedFunction={handleSaveDiet}
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
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	addDeitContainer: {
		flex: 1,
		padding: 20,
	},
	deleteButton: {
		padding: 0,
	},
	topContainer: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	inputLabel: {
		marginTop: 10,
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
	bottomContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: AppStyles.standardPadding - 5,
	},
	buttonText: {
		color: AppStyles.pressableButtonFontColor,
	},
	checkBox: {
		margin: 10,
	},
})