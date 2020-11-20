import React, { useState, useReducer } from 'react';
import UInote from './UInote';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: action.payload.id,
          completed: action.payload.completed,
          content: action.payload.content,
        },
      ];
    case 'remove':
      return state.filter(({ id }) => id !== action.payload.id);
    case 'check':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, completed: !item.completed }
          : item
      );
    default:
      return state;
  }
};

const useFormInput = initial => {
  const [value, setValue] = useState(initial);
  const handleChange = ({ target }) => setValue(target.value);
  return { value, onChange: handleChange };
};

const Note = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const myValue = useFormInput('');
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'add',
      payload: { content: myValue.value, id: Date.now(), completed: false },
    });
  };
  console.log(state);
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Note Taker</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={myValue.value}
            onChange={myValue.onChange}
          ></input>
          <input type="submit" placeholder="submit"></input>
        </form>
      </main>
      {!state.length && <h1>Currently, no notes are posted...</h1>}
      <UInote state={state} dispatch={dispatch} />
    </>
  );
};

export default Note;
