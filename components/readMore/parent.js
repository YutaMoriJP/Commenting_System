import React, { useState } from 'react';
import Note from './note';
import './style.css';

const Parent = () => {
  const [read, setRead] = useState(false);
  return (
    <>
      <button onClick={() => (!read ? setRead(true) : setRead(false))}>
        {!read ? 'Read More...' : 'Hide...'}
      </button>
      {read && <Note />}
    </>
  );
};

export default Parent;
