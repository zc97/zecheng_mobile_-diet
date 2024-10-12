import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useContext} from 'react'
import { ActivitiesContext } from '../contexts/ActivitiesContext'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function AddActivity() {
	const { activities, setActivities } = useContext(ActivitiesContext);

	const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Walking', value: 'walking'},
    {label: 'Running', value: 'running'},
		{label: 'Yoga', value: 'yoga'},
		{label: 'Cycling', value: 'cycling'},
		{label: 'Hiking', value: 'hiking'},
  ]);

	const [duration, setDuration] = useState(null);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };


	return (
		<View>
			<Button 
				title='add' 
				onPress = {() => {
					setActivities((activities) => [...activities, { id: '4', activity: 'Running', date: '2023-10-02', time: '10 mins' }])}}
			>
			</Button>
      <Text>Select An Activity</Text>
      <DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
    	/>

      <Text>Duration (min)</Text>
      <TextInput
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="Enter duration in minutes"
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
          onChange={onChange}
        />
      )}

		</View>
	)
}

const styles = StyleSheet.create({})