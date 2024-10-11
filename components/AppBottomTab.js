import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Activities from '../screens/Activities';
import Diet from '../screens/Diet';
import AppStyles from '../styles/AppStyles';

const Tab = createBottomTabNavigator();

export default function AppBottomTab({}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: AppStyles.mainColor,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: AppStyles.mainColor,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-run" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="Diet"
        component={Diet}
        options={{
          tabBarLabel: 'Diet',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fastfood" size={24} color="white" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({})