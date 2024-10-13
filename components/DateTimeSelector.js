import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState, useContext} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import AppStyles from '../styles/AppStyles';
import { ThemeContext } from '../contexts/ThemeContext';

export default function DateTimeSelector({ date, setDate }) {
    const { theme } = useContext(ThemeContext);

    const [show, setShow] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    return (
        <View>
            <Text style={[styles.label, {color: theme.textColor}]}>Date *</Text>
            <TextInput
                style={styles.inputField}
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
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
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
})