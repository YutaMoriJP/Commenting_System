import React from 'react';
import F from './f';
import { UserContext, UserName } from './app';

const D = () => {
  return (
    <UserContext.Consumer>
      {value => {
        return (
          <>
            <UserName.Consumer>
              {username => {
                return (
                  <>
                    <h6>Your username is: {username}</h6>
                  </>
                );
              }}
            </UserName.Consumer>
            <h1>Hi, {value.name}</h1>
            <input
              type="text"
              value={value.name}
              onChange={e => {
                return value.dispatch({
                  type: 'change',
                  payload: { name: e.target.value },
                });
              }}
            ></input>
            <F />
          </>
        );
      }}
    </UserContext.Consumer>
  );
};

export default D;
