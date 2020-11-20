import React from 'react';

const UInote = ({ state, dispatch }) => {
  return (
    <main className="note">
      {state.map(({ id, completed, content }) => {
        return (
          <div
            key={id}
            className="noteItem"
            style={{ background: completed ? 'black' : 'darkslateblue' }}
          >
            <h1
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch({ type: 'check', payload: { id } })}
            >
              Completed:{completed ? 'Yes' : 'No'}
            </h1>
            <p>{content}</p>
            <button
              onClick={() => dispatch({ type: 'remove', payload: { id } })}
            >
              Remove
            </button>
          </div>
        );
      })}
    </main>
  );
};

export default UInote;
