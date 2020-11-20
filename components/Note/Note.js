import React from 'react';

const Note = ({ note, setNote, handleSubmit }) => {
  return (
    <>
      <form>
        <input type="text" value={note} onChange={setNote} />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default Note;
