import React from 'react';

const Users = ({ obj }) => {
  return (
    <>
      <h1>Username: {obj.username}</h1>
      <p>Website: {obj.website}</p>
    </>
  );
};

export default Users;
