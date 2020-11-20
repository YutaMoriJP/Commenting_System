import React, { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();
const ToggleTheme = createContext();

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export const useToggleTheme = () => {
  const toggle = useContext(ToggleTheme);
  return toggle;
};

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true);
  const handleClick = () => setDark(prevDark => !prevDark);
  return (
    <ThemeContext.Provider value={dark}>
      <ToggleTheme.Provider value={handleClick}>
        {children}
      </ToggleTheme.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
