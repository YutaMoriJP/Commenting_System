import React from 'react';

export const theme = {
  light: { background: 'salmon', color: 'beige', border: 'none' },
  dark: { background: 'black', color: 'seagreen', border: 'none' },
};

export const Theme = React.createContext(theme.dark);
