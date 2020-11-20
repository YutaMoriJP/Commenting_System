import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  Fragment,
} from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { StyleContext, NewStyleContext } from './styleContext';

console.log(NewStyleContext);

const colors = {
  blue: 'slateblue',
  red: 'tomato',
  green: 'seagreen',
};

const ContextAPI = () => {
  return (
    <>
      <h1>Context API Practice:</h1>
      <StyleContext.Provider value={colors}>
        <ConsumerAPI />
      </StyleContext.Provider>
    </>
  );
};

const ConsumerAPI = () => {
  return (
    <>
      <StyleContext.Consumer>
        {colors => {
          return <h1 style={{ color: colors.blue }}>Hello, World</h1>;
        }}
      </StyleContext.Consumer>
    </>
  );
};

const ContextHook = () => {
  const value = useContext(NewStyleContext);
  console.log(value);
  return (
    <div style={value}>
      <h1>Context API + Hooks</h1>
    </div>
  );
};

const Main = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = e => {
    setMouse({ x: e.screenX, y: e.screenY });
  };
  return (
    <main onMouseMove={handleMouseMove}>
      <h1>Mouse Locations</h1>
      <p>X: {mouse.x}</p>
      <p>Y: {mouse.y}</p>
    </main>
  );
};

const useToggle = () => {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => setToggle(prevToggle => !prevToggle);
  return { toggle, onClick: handleClick };
};

const Toggle = () => {
  const value = useToggle();
  console.log(value);
  return (
    <>
      <p>Current Toggle: {value.toggle.toString()}</p>
      <button onClick={value.onClick}>Toggle</button>
    </>
  );
};

const Greeting = () => {
  const [toggle, setToggle] = useState(true);
  const handleClick = () => setToggle(prevToggle => !prevToggle);
  const [profile, setProfile] = useState([
    { name: 'Yuta', age: 25, goal: 'Developer' },
    { name: 'Trash', age: 26, goal: 'To Die' },
  ]);
  return (
    <>
      <Person toggle={toggle} profile={profile} />
      <ChangePerson handleClick={handleClick} />
    </>
  );
};

const Person = ({ toggle, profile }) => {
  return (
    <>
      <h1>Profile:</h1>
      {Object.keys(profile[toggle ? 0 : 1]).map(key => (
        <Fragment key={key}>
          <p>
            {key.toUpperCase()}: {profile[toggle ? 0 : 1][key]}
          </p>
        </Fragment>
      ))}
    </>
  );
};

const ChangePerson = ({ handleClick }) => {
  return (
    <button onClick={handleClick} style={{ cursor: 'pointer' }}>
      Switch person
    </button>
  );
};

const Loading = () => {
  const [loading, setLoading] = useState('.');
  useEffect(() => {
    let n = 0;
    const intervalID = setInterval(() => {
      if (n >= 3) {
        n = 0;
        setLoading(loading + '.'.repeat(n));
        n++;
      } else {
        setLoading(loading + '.'.repeat(n));
        n++;
      }
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);
  return (
    <>
      <p>Loading{loading}</p>
    </>
  );
};

const Parent = () => {
  return (
    <Child
      render={profile => (
        <>
          <p>{profile.name}</p>
          <p>{profile.age}</p>
        </>
      )}
    ></Child>
  );
};
const Child = ({ render }) => {
  return (
    <Fragment>{render({ name: 'Yuta', age: 25, id: Date.now() })}</Fragment>
  );
};

const P = () => {
  return <C render={() => <p>Hi</p>}></C>;
};
const C = props => {
  return <>{props.render()}</>;
};

const useCoordination = () => {
  const [cordination, setCordination] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = e => setCordination({ x: e.screenX, y: e.screenY });
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return cordination;
};

const Coordination = () => {
  const { x, y } = useCoordination();
  return (
    <>
      <h1>Mouse Coordinates:</h1>
      <p>x: {x}</p>
      <p>y: {y}</p>
    </>
  );
};

const App = () => {
  return (
    <>
      <ContextAPI />
      <ContextHook />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
