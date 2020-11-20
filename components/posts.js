import React from 'react';

const Posts = ({ obj }) => {
  return (
    <>
      <h1>New Post: {obj.title}</h1>
      <p>Content: {obj.body}</p>
    </>
  );
};

export default Posts;
