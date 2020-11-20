import React, { useState, useReducer, useEffect } from 'react';
import UseReducerProfile from './useReducerProfile';

const useFormInputs = initial => {
  const [value, setValue] = useState(initial);
  const handleChange = ({ target }) => setValue(target.value);
  return { value, onChange: handleChange };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { account: action.payload.profile, setting: action.payload.preference },
      ];
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const name = useFormInputs('');
  const surname = useFormInputs('');
  const username = useFormInputs('');
  const darkModePreference = useFormInputs('');
  const privacy = useFormInputs('');
  const handleClick = () => {
    dispatch({
      type: 'add',
      payload: {
        profile: {
          name: name.value,
          surname: surname.value,
          username: username.value,
        },
        preference: {
          isDark: darkModePreference.value,
          privacy: privacy.value,
        },
      },
    });
  };
  return (
    <div>
      <input {...name} placeholder="first name"></input>
      <input {...surname} placeholder="surname"></input>
      <input {...username} placeholder="username"></input>
      <input
        {...darkModePreference}
        placeholder="type darkmode or lightmode"
      ></input>
      <input {...privacy} placeholder="keep your profile public?"></input>
      <button onClick={handleClick}>Submit</button>
      {!!state.length && <UseReducerProfile profile={state} />}
    </div>
  );
};

export default Login;
