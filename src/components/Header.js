import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <header className="header-container" style={{ backgroundColor: `${theme.secondaryColor}` }}>
      <img src="" alt="" className="logo" />
      <ThemeToggler />
      <nav>
        <ul className="navigation">
          <li>
            <NavLink exact activeStyle={{ color: 'red' }} to="/">
              Notes
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: 'red' }} to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
