import React, { useState } from 'react';

const useFormInput = initialState => {
  const [value, setValue] = useState(initialState);
  const handleChange = ({ target }) => {
    setValue(target.value);
  };
  return { value, onChange: handleChange };
};

const Lineup = () => {
  const pg = useFormInput('PG');
  const sg = useFormInput('SG');
  const pf = useFormInput('PG');
  const sf = useFormInput('SF');
  const c = useFormInput('C');
  return (
    <>
      <h1>Construct your team's lineup:</h1>
      <ul>
        <li>{pg.value}</li>
        <li>{sg.value}</li>
        <li>{pf.value}</li>
        <li>{sf.value}</li>
        <li>{c.value}</li>
      </ul>
      <input {...pg} />
      <input {...sg} />
      <input {...pf} />
      <input {...sf} />
      <input {...c} />
    </>
  );
};

export default Lineup;
