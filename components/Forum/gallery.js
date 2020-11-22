import React, { useState, useEffect, useRef } from 'react';
import ImagePicker from './ImagePicker';
import ReactDOM from 'react-dom';
import './gallery.css';
import pg from './img/pg.jpg';
import c from './img/weisman.jpg';
import pf from './img/draymond.jpg';
import sg from './img/wiggins.jpeg';
import sf from './img/oubre.jpg';

export const images = [
  { img: pg, position: 'Point Guard' },
  { img: sg, position: 'Shooting Guard' },
  { img: pf, position: 'Power Forward' },
  { img: sf, position: 'Small Forward' },
  { img: c, position: 'Center' },
];

export const useGallery = (img, stop) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === img.length - 1) {
          return 0;
        } else {
          return prevCount + 1;
        }
      });
    }, 3000);
    if (stop) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [stop]);
  const [images] = useState(img);
  console.log(images[0].position);
  console.log(count);
  return {
    text: images[count].position,
    img: { src: images[count].img, width: 500, height: 500 },
  };
};

const MyGallery = () => {
  const [stop, setStop] = useState(false);
  const text = useGallery(images, stop).text;
  const img = useGallery(images, stop).img;
  return (
    <>
      <button onClick={() => setStop(prevStop => !prevStop)}>
        {stop ? 'Start' : 'Stop'} Gallery
      </button>
      <h1>{text}</h1>
      <img {...img} />
    </>
  );
};

const GetPreviousStateOrProps = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);
  useEffect(() => {
    prevCountRef.current = count;
    console.log(prevCountRef);
  });
  const previousCount = prevCountRef.current;
  return (
    <button onClick={() => setCount(p => p + 1)}>
      Current: {count} and Previous: {previousCount} and the
      prevCountRef.current is: {prevCountRef.current}
    </button>
  );
};

const AsyncOp = () => {
  const [c, setC] = useState(0);
  const refContainer = useRef(c);
  useEffect(() => {
    refContainer.current = c;
  });
  const handleClick = () => setC(p => p + 1);
  const asyncCall = () =>
    setTimeout(
      () =>
        alert(
          `Value when alert button was clicked: ${c} latest value: ${refContainer.current}`
        ),
      3000
    );
  return (
    <>
      <p>{c}</p>
      <button onClick={handleClick}>Increment</button>
      <button onClick={asyncCall}>Alert</button>
    </>
  );
};

ReactDOM.render(<MyGallery />, document.getElementById('root'));
