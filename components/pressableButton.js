import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import AppStyles from '../styles/AppStyles'

// Customized pressable button component
export default function PressableButton({ children, pressedFunction, componentStyle, componentPressedStyle}) {
	return (
		<Pressable 
			style={({ pressed }) => {return [
				styles.defaultStyle,
				componentStyle,
				pressed ? styles.defultPressedStyle : null,
				pressed ? componentPressedStyle : null,
			]}}
			onPress={pressedFunction}
		>
			<View>
				{children}
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	defaultStyle: {
		borderRadius: AppStyles.standardBorderRadius,
		padding: AppStyles.standardPadding + 5,
		margin: 5,
		backgroundColor: AppStyles.themeColor,
		alignItems: 'center',
	},
	defultPressedStyle: {
		backgroundColor: 'gray',
		opacity: 0.7,
	}
})