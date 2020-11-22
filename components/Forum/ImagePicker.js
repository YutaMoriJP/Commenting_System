import React, { useRef, useState, useEffect } from 'react';
import { images } from './gallery';

const useFormInput = () => {
  const [value, setValue] = useState('');
  const handleChange = ({ target }) => setValue(target.value);
  return { value, onChange: handleChange };
};

const GetPreviousStateOrProps = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  useEffect(() => (prevCountRef.current = count));
  const previousCount = prevCountRef.current;
  return (
    <button onClick={() => setCount(p => p + 1)}>
      Current: {count} and Previous: {previousCount} and the
      prevCountRef.current is: {previousCount.current}
    </button>
  );
};

const LocalVariable = () => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  useEffect(() => {
    const id = setInterval(() => setCount(prevCount => prevCount + 1), 1000);
    intervalRef.current = id;
  }, []);
  const handleCancelClick = () => clearInterval(intervalRef.current);
  return (
    <>
      <p>{count}</p>
      <button onClick={handleCancelClick}>Clear Counter</button>
    </>
  );
};

const TextInputWithFocusButton = () => {
  const inputEl = useRef(null);
  const h1El = useRef(null);
  const handleClick = () => inputEl.current.focus();
  const handleBgChange = () => (h1El.current.style.backgroundColor = 'blue');
  console.log(h1El);
  return (
    <>
      <button onClick={handleClick}>Focus the input</button>
      <input ref={inputEl} type="text"></input>
      <h1 ref={h1El}>HELLO</h1>
      <button onClick={handleBgChange}>Change P background color</button>
    </>
  );
};

export default function ImagePicker() {
  const search = useFormInput();
  const [results, setResults] = useState('');
  const InputElem = useRef();
  console.log(InputElem);
  useEffect(() => {
    InputElem.current.focus();
  });
  const handleClick = pos => {
    const num = { pg: 0, sg: 1, pf: 2, sf: 3, c: 4 }[pos];
    const obj = images[num];
    if (num <= images.length - 1) {
      setResults(<img src={obj.img} width={300} height={300} />);
    } else {
      setResults(<p>{search.value} Postion does not exist</p>);
    }
  };
  return (
    <>
      <GetPreviousStateOrProps />
      <LocalVariable />
      <input ref={InputElem} {...search} />
      <button onClick={() => handleClick(search.value)}>Search</button>
      {results}
    </>
  );
}
