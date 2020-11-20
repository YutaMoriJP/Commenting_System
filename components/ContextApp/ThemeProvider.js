import React, { createContext, useContext, useState } from 'react';

const CurrentTheme = createContext();

export const useCurrentTheme = () => {
  return useContext(CurrentTheme);
};

const ToggleTheme = createContext();

export const useToggleTheme = () => {
  return useContext(ToggleTheme);
};

const ThemeProvider = ({ children }) => {
  console.log(children);
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(prevIsDark => !prevIsDark);
  return (
    <CurrentTheme.Provider value={isDark}>
      <ToggleTheme.Provider value={toggleTheme}>
        {children}
      </ToggleTheme.Provider>
    </CurrentTheme.Provider>
  );
};

export default ThemeProvider;
