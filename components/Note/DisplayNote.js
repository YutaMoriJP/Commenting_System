import React, { useState, useReducer } from 'react';
import Note from './Note';
import NewNote from './NewNote';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        { newNote: action.payload.note, id: action.payload.id },
      ];
    case 'REMOVE':
      return state.filter(note => note.id !== action.payload.id);
    default:
      return state;
  }
};

const DisplayNote = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [note, setNote] = useState('');
  const handleChange = ({ target }) => setNote(target.value);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'ADD', payload: { note: note, id: Date.now() } });
  };
  return (
    <>
      <h1>Note Taking App:</h1>
      <Note note={note} setNote={handleChange} handleSubmit={handleSubmit} />
      {state.map(obj => {
        return (
          <React.Fragment key={obj.id}>
            <NewNote note={obj.newNote} id={obj.id} dispatch={dispatch} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DisplayNote;
