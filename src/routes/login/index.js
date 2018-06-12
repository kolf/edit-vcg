import React from 'react';
import Login from './Login';

async function action({ query }) {
  return {
    title: '登陆',
    chunks: ['login'],
    component: <Login token={query.token} />,
  };
}

export default action;
