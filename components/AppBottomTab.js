import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Activities from '../screens/Activities';
import Diet from '../screens/Diet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddActivity from '../screens/AddActivity';
import AddDiet from '../screens/AddDiet';
import { ActivitiesProvider } from '../contexts/ActivitiesContext';
import AppStyles from '../styles/AppStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Setting from '../screens/Setting';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppBottomTab() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: AppStyles.themeColor,
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
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={24} color="white" />
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
            backgroundColor: AppStyles.themeColor,
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
          name="Add An Activity" 
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
          backgroundColor: AppStyles.themeColor,
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


function SettingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: AppStyles.themeColor,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Setting" 
        component={Setting}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    headerStyle: {
      backgroundColor: AppStyles.themeColor,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})