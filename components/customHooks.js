import React, { useState, useEffect } from 'react';

const useFormInput = initial => {
  const [value, setValue] = useState(initial);
  const handleNameChange = ({ target }) => setValue(target.value);
  return { value: value, onChange: handleNameChange };
};

const UserInput = () => {
  const name = useFormInput('Yuta');
  const surname = useFormInput('Mori');
  return (
    <div style={{ border: '1px solid seagreen' }}>
      <p>{name.value}</p>
      <input type="text" value={name.value} onChange={name.onChange} />
      <p>{surname.value}</p>
      <input type="text" value={surname.value} onChange={surname.onChange} />
      <main style={{ boder: '1px solid yellow' }}>
        <h1>{name.value}</h1>
        <input {...name} />
        <h1>{surname.value}</h1>
        <input {...surname} />
      </main>
    </div>
  );
};

export default UserInput;
