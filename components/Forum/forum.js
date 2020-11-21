import React, { useState, useEffect, useReducer, useContext } from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from './ThemeProvider';
import UserSetting from './SettingProvider';
import Setting from './Setting';
import { useHidden } from './SettingProvider';
import './forum.css';

const MyContext = React.createContext();

const useCMyContext = () => {
  const myContext = useContext(MyContext);
  return myContext;
};

const DeeplyNestedComponent = () => {
  const count = useMyContext();
  return <p>Current count is {count}</p>;
};
const App = () => {
  const [count, setCount] = useState(0);
  return <MyContext.Provider value={count}>{children}</MyContext.Provider>;
};

const useUserInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleChange = ({ target }) => setValue(target.value);
  return { value, onChange: handleChange };
};

const sortArr = (type, arr) => {
  if (type === 'most_upvoted') {
    const sorted = arr.sort((a, b) => b.count - a.count);
    return sorted.map((obj, index) => {
      obj.id = Date.now() + index;
      return obj;
    });
  } else if (type === 'order') {
    const sorted = arr.sort((a, b) => b.order - a.order);
    return sorted.map((obj, index) => {
      obj.id = Date.now() + index;
      return obj;
    });
  } else {
    return arr;
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const arr = [
        ...state,
        {
          comment: action.payload.comment,
          id: action.payload.id,
          count: action.payload.count,
          order: action.payload.order,
        },
      ];
      return sortArr(action.payload.sortAlgortihm, arr);
    case 'increment':
      return state.map(obj => {
        if (obj.id === action.payload.id) {
          obj.count += 1;
          return obj;
        } else {
          return obj;
        }
      });
    case 'decrement':
      return state.map(obj => {
        if (obj.id === action.payload.id) {
          obj.count -= 1;
          return obj;
        } else {
          return obj;
        }
      });
    case 'most_upvoted':
      const sorted = state.sort((a, b) => b.count - a.count);
      return sorted.map((obj, index) => {
        obj.id = Date.now() + index;
        return obj;
      });
    case 'order':
      const s = state.sort((a, b) => b.order - a.order);
      return s.map((obj, i) => {
        obj.id = Date.now() + i;
        return obj;
      });
    default:
      return state;
  }
};

const Forum = () => {
  const comment = useUserInput('');
  const [hide, setHide] = useState(false);
  const [state, dispatch] = useReducer(reducer, []);
  const [select, setSelect] = useState('Sort');
  const [order, setOrder] = useState(0);
  const { isHidden } = useHidden();
  const handleClick = e => {
    e.preventDefault();
    dispatch({
      type: 'add',
      payload: {
        comment: comment.value,
        id: Date.now(),
        count: 0,
        order: order,
        sortAlgortihm: select,
      },
    });
    setOrder(prevOrder => prevOrder + 1);
  };
  if (isHidden) {
    return null;
  }
  if (!hide) {
    return (
      <>
        <WindowWidth />
        <button onClick={() => setHide(prevHide => !prevHide)}>Hide</button>
        <ThemeProvider>
          <Sorting dispatch={dispatch} select={select} setSelect={setSelect} />
          <p>Total Comments: {state.length}</p>
          <div className="post">
            <input {...comment} />
            <button onClick={handleClick}>Post</button>
          </div>
          <div className="box">
            <Comment comments={state} dispatch={dispatch} select={select} />
          </div>
          <Setting />
        </ThemeProvider>
        <Page />
      </>
    );
  } else {
    return (
      <button onClick={() => setHide(prevHide => !prevHide)}>Unhide</button>
    );
  }
};

const Main = () => {
  return (
    <UserSetting>
      <Forum />
    </UserSetting>
  );
};

const Sorting = ({ dispatch, select, setSelect }) => {
  return (
    <div className="sort">
      <select value={select} onChange={e => setSelect(e.target.value)}>
        <option value="order">New</option>
        <option value="most_upvoted">Most Upvoted</option>
      </select>
      <button
        onClick={() => {
          console.log(select);
          dispatch({ type: select });
        }}
      >
        Submit
      </button>
    </div>
  );
};

const Comment = ({ comments, dispatch, select }) => {
  return (
    <>
      {comments.map(comment => {
        return (
          <React.Fragment key={comment.id}>
            <DisplayComment
              comment={comment.comment}
              id={comment.id}
              count={comment.count}
              dispatch={dispatch}
              select={select}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

const DisplayComment = ({ comment, id, count, dispatch, select }) => {
  return (
    <div className="comment">
      <div className="score">
        <h1 style={{ color: count >= 0 ? 'limegreen' : 'rgb(145, 0, 24)' }}>
          {count}
        </h1>
      </div>
      <div className="user">
        <h1>{comment}</h1>
      </div>
      <div className="vote">
        <h1
          className="up"
          onClick={() =>
            dispatch({
              type: 'increment',
              payload: { id: id, sortAlgortihm: select },
            })
          }
        >
          +
        </h1>
        <h1
          className="down"
          onClick={() =>
            dispatch({
              type: 'decrement',
              payload: { id: id, sortAlgortihm: select },
            })
          }
        >
          -
        </h1>
      </div>
    </div>
  );
};

const WindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleOnResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleOnResize);
    return () => window.removeEventListener('resize', handleOnResize);
  }, []);
  return <>{windowWidth}</>;
};

const Page = () => {
  const [count, setCount] = useState(20);
  const { isHidden, handleHidden } = useHidden();
  console.log(isHidden);
  useEffect(() => {
    if (count === 0) {
      handleHidden(true);
    }
  }, [count]);
  useEffect(() => {
    const id = setInterval(() => setCount(prevCount => prevCount - 1), 1000);
    if (isHidden) {
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [isHidden]);
  const convertTime = time => {
    let s = time % 60 === 0 ? 0 : time % 60;
    let m = time % 60 === 0 ? time / 60 : (time - (time % 60)) / 60;
    let isZero = m < 10 ? 0 : '';
    let isSecondZero = s < 10 ? 0 : '';
    return `${isZero}${m}:${isSecondZero}${s}`;
  };
  return (
    <>
      <p>{convertTime(count)}</p>
    </>
  );
};
ReactDOM.render(<Main />, document.getElementById('root'));
