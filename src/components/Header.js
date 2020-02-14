import React, { useContext } from 'react';
import ThemeToggler from './ThemeToggler';
import { ThemeContext } from '../context/ThemeContext';

//TODO: add Logo and routing Links
const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <header className="header-container" style={{ backgroundColor: `${theme.secondaryColor}` }}>
      <img src="" alt="" className="logo" />
      <ThemeToggler />
      <nav>
        <ul className="navigation">
          <li>
            <a href="#">Notes</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
