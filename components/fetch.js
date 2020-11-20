import React, { useState, useReducer, useEffect } from 'react';
import UserData from './userdata';
import Comment from './comment';
import Users from './users';
import Posts from './posts';
import './all.css';

const fetchNew = arr => {
  let num = Math.floor(Math.random() * (arr.length / 10));
  return arr.slice(num, num + 10);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'posts':
      state[0].posts.push(action.payload.content);
      const posts = [
        {
          posts: action.payload.content,
          comments: state[0].comments,
          users: state[0].users,
        },
      ];
      return posts;
    case 'comments':
      const comments = [
        {
          posts: state[0].posts,
          comments: action.payload.content,
          users: state[0].users,
        },
      ];
      return comments;
    case 'users':
      const users = [
        {
          posts: state[0].posts,
          comments: state[0].comments,
          users: action.payload.content,
        },
      ];
      return users;
    default:
      return state;
  }
};

const Fetch = () => {
  const [requestType, setRequestType] = useState('');
  const [state, dispatch] = useReducer(reducer, [
    { posts: [], comments: [], users: [] },
  ]);
  useEffect(() => {
    UserData.fetching(requestType).then(jsonResponse => {
      dispatch({ type: requestType, payload: { content: jsonResponse } });
    });
  }, [requestType]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleChange = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const int = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(int);
  }, []);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setTimer(prevCount => prevCount + 1),
      1000
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <h1>Timer: {timer}</h1>
      <main
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
      >
        <button onClick={() => setRequestType('posts')}>Posts</button>
        <button onClick={() => setRequestType('comments')}>Comments</button>
        <button onClick={() => setRequestType('users')}>Users</button>
      </main>
      <article>
        <div className="posts">
          {state[0].posts.slice(0, 10).map(item => (
            <Posts obj={item} key={item.id} />
          ))}
        </div>
        <div className="comment">
          {state[0].comments.slice(0, 10).map(item => (
            <Comment obj={item} key={item.id} />
          ))}
        </div>
        <div className="users">
          {state[0].users.slice(0, 10).map(item => (
            <Users obj={item} key={item.id} />
          ))}
        </div>
      </article>
    </>
  );
};

export default Fetch;
