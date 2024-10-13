import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import PressableButton from '../components/pressableButton'
import { ThemeContext } from '../contexts/ThemeContext'


export default function Setting() {
	const { theme, toggleTheme } = useContext(ThemeContext)
	
	return (
		<View>
			<PressableButton
				pressedFunction={() => (toggleTheme())}
			>
				<Text>Toggle Theme </Text>
			</PressableButton>
		</View>
	)
}

const styles = StyleSheet.create({})