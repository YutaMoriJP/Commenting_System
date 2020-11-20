import React, { useState, useEffect, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import Theme from './theme.js';

export const ThemeContext = createContext({
  dark: { background: 'black', color: 'lightseagreen', border: 'white' },
  light: { background: 'beige', color: 'salmon', border: 'black' },
});

export const LanguageContext = createContext({ current: 'English' });

const Language = () => {
  const language = useContext(LanguageContext);
  return (
    <>
      <h1>Current Language Setting is: {language.current}</h1>
    </>
  );
};

const Main = () => {
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState('.');
  const language = useContext(LanguageContext);
  const [main, setMain] = useState(language.current);
  const handleLanguageChange = ({ target }) => {
    setMain(target.value);
  };
  useEffect(() => {
    let n = 1;
    let i = setInterval(() => {
      if (n === 4) {
        n = 1;
        setLoading('.'.repeat(n));
      } else {
        setLoading('.'.repeat(n));
        n += 1;
      }
    }, 1000);
  }, []);
  const handleClick = () => setIsDark(prevIsDark => !prevIsDark);
  return (
    <>
      <ThemeContext.Provider value={{ isDark, onClick: handleClick }}>
        <h1>Loading React Context Tutorial: {loading}</h1>
        <button onClick={handleClick}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </button>
        <Language />
        <LanguageContext.Provider
          value={{
            main: main,
            onChange: handleLanguageChange,
            language: main,
          }}
        >
          <ChangeLanguage />
        </LanguageContext.Provider>
        <Theme />
      </ThemeContext.Provider>
    </>
  );
};

const ChangeLanguage = () => {
  return (
    <>
      <LanguageContext.Consumer>
        {value => {
          return (
            <>
              <h2>Website Language: {value.main.current}</h2>
              <input
                type="text"
                value={value.language}
                onChange={value.onChange}
              />
            </>
          );
        }}
      </LanguageContext.Consumer>
    </>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
