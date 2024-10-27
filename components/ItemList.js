import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import Item from './Item'
import { database } from '../firebase/firebaseSetup'

// Component that displays a flatlist of items (activities or diet items)
export default function ItemList({ type, items }) {
	// Depending on the type of item, display the appropriate list
	return (
		<FlatList
			data={items}
			renderItem={({ item }) => <Item itemData={item} type={type}/>}
		/>
	) 
}

const styles = StyleSheet.create({})