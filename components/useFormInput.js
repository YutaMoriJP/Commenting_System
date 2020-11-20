import React, { useState, useEffect } from 'react';

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = ({ target }) => setValue(target.value);
  return { value, onChange: handleChange };
};

const Profile = () => {
  const name = useFormInput('');
  const surname = useFormInput('');
  const age = useFormInput('');
  const [sentence, setSentence] = useState('');
  useEffect(() => {
    if (name.value.length && surname.value.length && age.value.length) {
      setSentence(
        `My name is ${name.value} ${surname.value} and I'm ${age.value} years old`
      );
    }
  }, [name, surname, age]);
  const display = (n, s, a) => {
    return (
      <>
        <h1>Your profile is:</h1>
        <p>Name: {n}</p>
        <p>Surname: {s}</p>
        <p>Age: {a}</p>
      </>
    );
  };
  return (
    <>
      {name.value.length && surname.value.length && age.value.length ? (
        display(name.value, surname.value, age.value)
      ) : (
        <h1>Please enter info first...</h1>
      )}
      <h1>{!!sentence.length && sentence}</h1>
      <input {...name}></input>
      <input {...surname}></input>
      <input {...age}></input>
    </>
  );
};

export default Profile;
