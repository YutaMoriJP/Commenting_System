import React, { useState, useEffect } from 'react';
import Width from './width';

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowChange = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowChange);
    return () => window.removeEventListener('resize', handleWindowChange);
  }, []);
  return width;
};

const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  });
};

const MyProfile = () => {
  const [name, setName] = useState('Yuta');
  const [surname, setSurname] = useState('Mori');
  useDocumentTitle(`${name} ${surname}`);
  return (
    <>
      <Width useWidth={useWidth} />
      <p>First: {name}</p>
      <input
        type="text"
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="type first name"
      />
      <p>Last: {surname}</p>
      <input
        type="text"
        value={surname}
        onChange={({ target }) => setSurname(target.value)}
        placeholder="type last name"
      />
    </>
  );
};

export default MyProfile;
