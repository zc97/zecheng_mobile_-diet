import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTab from './components/AppBottomTab';
import AppStyles from './styles/AppStyles';
import { ThemeProvider } from './contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
          <AppBottomTab/>
      </NavigationContainer>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({});
