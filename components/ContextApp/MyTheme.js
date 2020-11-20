import React from 'react';
import { useCurrentTheme, useToggleTheme } from './ThemeProvider';

const MyTheme = () => {
  const toggle = useToggleTheme();
  const theme = useCurrentTheme();
  return (
    <div
      onClick={toggle}
      className={theme ? 'theme darkTheme' : 'theme lightTheme'}
    >
      <h3>My {theme ? 'dark' : 'light'} Theme:</h3>
    </div>
  );
};

export default MyTheme;
