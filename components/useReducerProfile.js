import React from 'react';

const UseReducerProfile = ({ profile }) => {
  console.log(profile);
  return (
    <>
      <div className="profile">
        {profile.map(({ account }) => {
          const { name, surname, username } = account;
          return (
            <>
              <h1>Profile:</h1>
              <p>name: {name}</p>
              <p>surname: {surname}</p>
              <p>username: {username}</p>
            </>
          );
        })}
      </div>
      <div className="preference">
        {profile.map(({ setting }) => {
          const { isDark, privacy } = setting;
          return (
            <>
              <h1>Preferences:</h1>
              <p>background:: {isDark}</p>
              <p>Privacy Setting: {privacy}</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default UseReducerProfile;
