import React from 'react';
import { useProfile, useUsername } from './app';

const F = () => {
  const { name, dispatch } = useProfile();
  const userName = useUsername();
  console.log(useProfile());
  return (
    <>
      <h1 style={{ color: 'seagreen' }}>Component F</h1>
      <h6>Hi, {name}</h6>
      <h6>Your username is: {userName}</h6>
      <input
        value={name}
        onChange={({ target }) =>
          dispatch({ type: 'change', payload: { name: target.value } })
        }
      />
    </>
  );
};

export default F;
