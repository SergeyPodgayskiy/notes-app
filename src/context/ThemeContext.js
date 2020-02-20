import React, { createContext, useState } from 'react';
import appTheme from '../utils/appTheme';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(appTheme['blueMode']);

  return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
