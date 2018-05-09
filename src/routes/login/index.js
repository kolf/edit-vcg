/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Login from './Login';

async function action({ fetch, query }) {
  if (query.token) {
    const res = await fetch(`/api/edit/user/viewByToken?token=${query.token}`);
    console.log(res.json());
  }
  // const res = await fetch('/')
  return { title: '登陆', chunks: ['login'], component: <Login /> };
}

export default action;
