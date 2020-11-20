import React, { useReducer, useState } from 'react';
import { useToggleTheme } from './ThemeProvider';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

export default function AnotherTheme() {
  const toggle = useToggleTheme();
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const handleClick = type => {
    dispatch({ type: type });
  };
  return (
    <>
      <h3>Current Count: {state.count}</h3>
      <button onClick={() => handleClick('increment')}>+</button>
      <button onClick={() => handleClick('decrement')}>-</button>
      <button onClick={() => handleClick('reset')}>Reset</button>
      <button onClick={toggle}>Switch here?</button>
    </>
  );
}
