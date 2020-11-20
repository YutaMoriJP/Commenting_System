import React from 'react';
import { useThemeContext, useToggleTheme } from './ThemeProvider';

const Theme = () => {
  const dark = useThemeContext();
  const toggle = useToggleTheme();
  const handleClick = () => {
    toggle();
    document.body.style.backgroundColor = dark ? 'black' : 'white';
  };
  return (
    <button
      onClick={handleClick}
      style={{
        background: dark ? 'white' : 'black',
        color: dark ? 'black' : 'white',
      }}
    >
      {dark ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default Theme;
