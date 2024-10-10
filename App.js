import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Profile" 
        component={Activities}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-run" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen 
        name="Diet" 
        component={Diet}
        options={{
          tabBarLabel: 'Diet',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="fastfood" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Activities" component={Activities} />
        <Stack.Screen name="Diet" component={Diet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
});
