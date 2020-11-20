import React from 'react';

const Width = props => {
  const width = props.useWidth();
  return <p>Your window width is: {width}</p>;
};

export default Width;
