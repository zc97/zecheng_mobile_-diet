import React, { createContext, useState } from 'react';
import AppStyles from '../styles/AppStyles';

// Create the theme context with two styles: light and dark
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Set the default theme to light
  const [theme, setTheme] = useState({
    backgroundColor: AppStyles.lightBackgroundColor,
    textColor: AppStyles.lightTextColor,
    iconColor: AppStyles.lightTabIconColor,
  });

  // Toggle between light and dark theme
  const toggleTheme = () => {
    if (theme.backgroundColor === AppStyles.lightBackgroundColor) {
      setTheme({
        backgroundColor: AppStyles.darkBackgroundColor,
        textColor: AppStyles.darkTextColor,
        iconColor: AppStyles.darkTabIconColor,
      });
    } else {
      setTheme({
        backgroundColor: AppStyles.lightBackgroundColor,
        textColor: AppStyles.lightTextColor,
        iconColor: AppStyles.lightTabIconColor,
      });
    }
  }

  return (
    // Pass the theme and toggleTheme function to the provider
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };