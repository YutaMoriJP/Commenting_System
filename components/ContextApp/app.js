import React, { useEffect, useState, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from './ThemeProvider';
import MyTheme from './MyTheme';
import Theme from './theme';
import Language from './language';
import './style.css';
import C from './c';
import { useToggleTheme } from './ThemeProvider';
import AnotherTheme from './AnotherTheme';
import DisplayNote from '../Note/DisplayNote';

const CurrentTheme = React.createContext();
const CurrentLanguage = React.createContext();
export const UserContext = React.createContext();
export const UserName = React.createContext();

export const useTheme = () => {
  const theme = useContext(CurrentTheme);
  return theme;
};

export const useLanguage = () => {
  const language = useContext(CurrentLanguage);
  return language;
};

export const useProfile = () => {
  const profile = useContext(UserContext);
  return profile;
};

export const useUsername = () => {
  const username = useContext(UserName);
  return username;
};
const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'change':
      return { ...state, name: action.payload.name };
    case 'reset':
      return { ...state, name: 'Yuta' };
    default:
      return state;
  }
};

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState('English');
  const [state, dispatch] = useReducer(reducer, { name: 'Yuta' });
  const handleLanguageChange = ({ target }) => {
    console.log(target.value);
    setLanguage(target.value);
  };
  const toggle = useToggleTheme();
  const theme = isDark ? 'dark' : 'light';
  const handleThemeToggle = () => {
    setIsDark(prevIsDark => !prevIsDark);
  };
  return (
    <>
      <UserContext.Provider value={{ name: state.name, dispatch }}>
        <UserName.Provider value={'xZaizenx'}>
          <C />
        </UserName.Provider>
      </UserContext.Provider>
      <CurrentTheme.Provider value={{ theme, onClick: handleThemeToggle }}>
        <CurrentLanguage.Provider
          value={{ language, onChange: handleLanguageChange }}
        >
          <Theme />
          <Language />
        </CurrentLanguage.Provider>
      </CurrentTheme.Provider>
      <ThemeProvider>
        <MyTheme />
        <AnotherTheme />
      </ThemeProvider>
      <hr></hr>
      <DisplayNote />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
