import React, { useContext } from 'react';
import { ThemeContext } from './main';
import './theme.css';

const Theme = () => {
  const theme = useContext(ThemeContext);
  console.log(theme);
  return (
    <ThemeContext.Consumer>
      {value => {
        return (
          <div className={value.isDark ? 'dark' : 'light'}>
            <h1>The current theme is: {value.isDark ? 'dark' : 'light'}</h1>
            <button onClick={value.onClick}>
              Switch to {value.isDark ? 'Light' : 'dark'} Mode
            </button>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Theme;
