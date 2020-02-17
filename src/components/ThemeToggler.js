import React, { useContext } from 'react';
import AppTheme from '../utils/AppTheme';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);

  const handleSelectThemeMode = e => {
    const themeName = e.target.value;
    const theme = AppTheme[themeName];

    if (!theme) return;
    setThemeMode(theme);
  };

  return (
    <select value={themeMode.name} onChange={handleSelectThemeMode}>
      {Object.keys(AppTheme).map(themeName => {
        const theme = AppTheme[themeName];
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
