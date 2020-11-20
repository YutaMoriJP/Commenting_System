import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, { note: action.payload.note, id: action.payload.id }];
    case 'remove':
      return state.filter(obj => obj.id !== action.payload.id);
    default:
      return state;
  }
};

const App = () => {
  const [value, setValue] = useState('');
  const [state, dispatch] = useReducer(reducer, []);
  const handleClick = e => {
    e.preventDefault();
    dispatch({ type: 'add', payload: { note: value, id: Date.now() } });
  };
  return (
    <>
      <h1>Note Taking App</h1>
      <form>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={handleClick}>Submit</button>
      </form>
      {state.map(obj => {
        return (
          <React.Fragment key={obj.id}>
            <p>{obj.note}</p>
            <p
              onClick={() =>
                dispatch({ type: 'remove', payload: { id: obj.id } })
              }
            >
              Remove
            </p>
          </React.Fragment>
        );
      })}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
