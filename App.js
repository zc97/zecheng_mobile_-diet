import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTab from './components/AppBottomTab';
import AddActivity from './screens/AddActivity';
import AppStyles from './styles/AppStyles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        {/* <Stack.Screen
          name="AppBottomTab"
          component={AppBottomTab}
          options={{ headerShown: false }}
        /> */}
        <AppBottomTab/>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
});
