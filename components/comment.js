import React from 'react';

const Comment = ({ obj }) => {
  return (
    <>
      <h1>Name: {obj.name}</h1>
      <p>Email: {obj.email}</p>
      <p>{obj.body}</p>
    </>
  );
};

export default Comment;
