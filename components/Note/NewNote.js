import React from 'react';

export default function NewNote({ note, id, dispatch }) {
  return (
    <>
      <p>{note}</p>
      <button onClick={() => dispatch({ type: 'REMOVE', payload: { id: id } })}>
        Remove
      </button>
    </>
  );
}
