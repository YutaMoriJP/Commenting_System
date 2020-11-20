import React, { useState, useReducer, useContext } from 'react';

const UserSetting = React.createContext();

const ChangeSetting = React.createContext();

export const useSetting = () => useContext(UserSetting);

export const useToggleSetting = () => useContext(ChangeSetting);

const reducer = (state, action) => {
  switch (action.type) {
    case 'setting':
      return {
        darkmode: action.payload.darkmode,
        private: action.payload.private,
      };
    default:
      return state;
  }
};

export default function SettingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <UserSetting.Provider value={state}>
      <ChangeSetting.Provider value={dispatch}>
        {children}
      </ChangeSetting.Provider>
    </UserSetting.Provider>
  );
}
