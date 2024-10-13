import React, { createContext, useState } from 'react';
import AppStyles from '../styles/AppStyles';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: AppStyles.lightBackgroundColor,
    textColor: AppStyles.lightTextColor,
  });

  const toggleTheme = () => {
    if (theme.backgroundColor === AppStyles.lightBackgroundColor) {
      setTheme({
        backgroundColor: AppStyles.darkBackgroundColor,
        textColor: AppStyles.darkTextColor,
      });
    } else {
      setTheme({
        backgroundColor: AppStyles.lightBackgroundColor,
        textColor: AppStyles.lightTextColor,
      });
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };