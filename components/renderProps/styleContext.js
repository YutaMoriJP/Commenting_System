import React, { createContext } from 'react';

export const StyleContext = createContext('evergreen');

export const NewStyleContext = createContext({
  color: 'beige',
  backgroundColor: 'green',
});
