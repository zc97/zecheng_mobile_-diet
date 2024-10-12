import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Activities from '../screens/Activities';
import Diet from '../screens/Diet';
import AppStyles from '../styles/AppStyles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddActivity from '../screens/AddActivity';
import AddDiet from '../screens/AddDiet';
import { ActivitiesProvider } from '../contexts/ActivitiesContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function AppBottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: AppStyles.mainColor,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ActivityStack"
        component={ActivityStack}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-run" size={24} color="white" />
          ),
        }}
      />
      <Tab.Screen
        name="DietStack"
        component={DietStack}
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

function ActivityStack() {
  return (
    <ActivitiesProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: AppStyles.mainColor,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Activities" 
          component={Activities}
        />
        <Stack.Screen 
          name="AddActivity" 
          component={AddActivity} 
        />
      </Stack.Navigator>
    </ActivitiesProvider>
  );
}

function DietStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppStyles.mainColor,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Diet" 
        component={Diet}
      />
      <Stack.Screen 
        name="AddDiet" 
        component={AddDiet} 
      />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  header: {
    headerStyle: {
      backgroundColor: AppStyles.mainColor,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})