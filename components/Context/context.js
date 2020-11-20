import React, { useState, useEffect, useReducer, useContext } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { theme, Theme } from './themeContext';
import { Locale, languages } from './languageContext';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState(true);
  const handleClick = () => setCurrentTheme(prevTheme => !prevTheme);
  return (
    <div style={currentTheme ? theme.light : theme.dark} className="container">
      <h1>Context API</h1>
      <Theme.Provider value={{ ...theme, currentTheme, handleClick }}>
        <ToggleTheme />
        <Languages />
      </Theme.Provider>
    </div>
  );
};

const ToggleTheme = () => {
  return (
    <Theme.Consumer>
      {({ light, dark, currentTheme, handleClick }) => {
        return (
          <>
            <button style={!currentTheme ? light : dark} onClick={handleClick}>
              Change Background
            </button>
          </>
        );
      }}
    </Theme.Consumer>
  );
};

const Languages = () => {
  const locale = useContext(Locale);
  console.log(locale.img);
  return (
    <>
      <p>Language is: {locale.language}</p>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
