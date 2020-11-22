import React, { useRef, useState, useEffect } from 'react';

export const RefComponent = () => {
  const [count, setCount] = useState(0);
  const previous = useRef();
  useEffect(() => {
    previous.current = count;
  }, [count]);
  const previousCount = previous.current;
  return (
    <>
      <p>
        Curent {count} - Previous {previousCount}
      </p>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
};

export const AdvancedComponent = () => {
  const [count, setCount] = useState(0);
  const CurrentClicks = useRef();
  useEffect(() => {
    CurrentClicks.current = count;
  }, [count]);
  const handleClick = () => {
    setCount(p => p + 1);
  };
  const refCount = CurrentClicks.current;
  const asyncClicker = () => {
    setTimeout(
      () =>
        alert(
          `The count when async was clicked was: ${count}, but the current is: ${CurrentClicks.current}, and this ref local is ${refCount}`
          //count is when async clicker was clicked,
          //currentClicks is the current count since useEffect is called after
          //every re-render so it stays up to date, and refCount is the
          //value when async was clicked, which is count - 1
        ),
      3000
    );
  };
  return (
    <>
      <p>Current: {count}</p>
      <button onClick={handleClick}>+</button>
      <button onClick={asyncClicker}>Async Clicker</button>
    </>
  );
};

export const RefTutorial = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = count;
  }, [count]);
  const refCount = renderCount.current;
  return (
    <>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <p>Current Count: {count}</p>
      <p>Total Renders: {renderCount.current}</p>
    </>
  );
};

const useFormInputs = () => {
  const [value, setValue] = useState('');
  const handleChange = ({ target }) => setValue(target.value);
  return { value, onChange: handleChange };
};

export const DOMPractice = () => {
  const DOMelem = useRef(null);
  const name = useFormInputs('');
  console.log(document.getElementById('name'));
  console.log(DOMelem.current);
  return (
    <>
      <input ref={DOMelem} {...name} id="name" />
      <p>My Name is: {name.value}</p>
    </>
  );
};
