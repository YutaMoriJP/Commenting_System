import React, { useContext, createContext } from 'react';

export const languages = [
  { language: 'English', img: './img/uk.png' },
  { language: 'German', img: './img/ger.png' },
  { language: 'Japanese', img: './img/jp.png' },
];
export const Locale = createContext({
  language: 'English',
  img: './img/uk.png',
});
