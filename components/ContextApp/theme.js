import React from 'react';
import { useTheme, useLanguage } from './app';

const Theme = () => {
  const { theme, onClick } = useTheme();
  const { language, onChange } = useLanguage();
  const styleFunc = isDark => {
    return isDark === 'dark'
      ? { color: 'salmon', background: 'beige', border: 'none', padding: 15 }
      : {
          color: 'lightseagreen',
          background: 'black',
          border: 'none',
          padding: 15,
        };
  };
  return (
    <div className={theme}>
      <h2>Theme Component</h2>
      <button onClick={onClick} style={styleFunc(theme)}>
        Toggle Theme
      </button>
      <h6>Current Language is: {language}</h6>
    </div>
  );
};

export default Theme;
