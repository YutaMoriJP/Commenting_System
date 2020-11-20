import React, { useState } from 'react';
import { useLanguage } from './app';

const Language = () => {
  const { language, onChange } = useLanguage();
  return (
    <>
      <h2>Language Component: {language}</h2>
      <select value="Choose Language" onChange={onChange}>
        <option value={language}>Current: {language}</option>
        <option value="English">English</option>
        <option value="German">German</option>
        <option value="Japanese">Japanese</option>
      </select>
    </>
  );
};

export default Language;
