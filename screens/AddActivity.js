import { StyleSheet, Text, View, Button, TextInput, Pressable, Alert } from 'react-native'
import React, {useState, useContext} from 'react'
import { ActivitiesContext } from '../contexts/ActivitiesContext'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddActivity( { navigation }) {
	const { activities, setActivities } = useContext(ActivitiesContext);

	const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [items, setItems] = useState([
    {label: 'Walking', value: 'Walking'},
    {label: 'Running', value: 'Running'},
		{label: 'Yoga', value: 'Yoga'},
		{label: 'Cycling', value: 'Cycling'},
		{label: 'Hiking', value: 'Hiking'},
  ]);

	const [duration, setDuration] = useState(null);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };


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
				time: duration + ' mins' }
			])
			navigation.navigate('Activities')
	}	


	return (
		<View>
      <Text>Select An Activity</Text>
      <DropDownPicker
				open={open}
				value={activity}
				items={items}
				setOpen={setOpen}
				setValue={setActivity}
				setItems={setItems}
    	/>

      <Text>Duration (min)</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration in minutes"
				keyboardType="numeric"
      />

			<Text>Date</Text>
			<TextInput
				style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
				value={date.toDateString()}
				editable={false}
				onPressIn={() => setShow(show ? false : true)}
			/>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
					display="inline"
          onChange={onChangeDate}
        />
      )}

			<Pressable
				onPress={handleSaveActivity}
			>
				<Text>Save</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({})