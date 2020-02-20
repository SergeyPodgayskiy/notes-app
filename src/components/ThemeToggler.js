import React, { useContext } from 'react';
import appTheme from '../utils/appTheme';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const handleSelectThemeMode = e => {
    const themeName = e.target.value;
    const theme = appTheme[themeName];

    if (!theme) return;
    setThemeMode(theme);
  };

  return (
    <select value={themeMode.name} onChange={handleSelectThemeMode}>
      {Object.keys(appTheme).map(themeName => {
        const theme = appTheme[themeName];
        return (
          <option key={theme.name} value={theme.name}>
            {theme.name}
          </option>
        );
      })}
    </select>
  );
};

export default ThemeToggler;
