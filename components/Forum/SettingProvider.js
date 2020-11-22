import React, { useState, useReducer, useContext } from 'react';

import PropTypes from 'prop-types';

const UserSetting = React.createContext();

const ChangeSetting = React.createContext();

const IsHidden = React.createContext();

export const useSetting = () => useContext(UserSetting);

export const useToggleSetting = () => useContext(ChangeSetting);

export const useHidden = () => {
  const hidden = useContext(IsHidden);
  return hidden;
};

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
  console.log(children);
  console.log(typeof children);
  const [state, dispatch] = useReducer(reducer, {});
  const [isHidden, setIsHidden] = useState(false);
  return (
    <IsHidden.Provider value={{ isHidden, handleHidden: setIsHidden }}>
      <UserSetting.Provider value={state}>
        <ChangeSetting.Provider value={dispatch}>
          {children}
        </ChangeSetting.Provider>
      </UserSetting.Provider>
    </IsHidden.Provider>
  );
}

SettingProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
