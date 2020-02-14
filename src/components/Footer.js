import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <footer className="footer-container" style={{ backgroundColor: `${theme.secondaryColor}` }}>
      Footer
    </footer>
  );
};

export default Footer;
