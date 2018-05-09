/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Topics from './Topics';

const title = '专题管理';

function action() {
  return {
    chunks: ['topics'],
    title,
    component: (
      <Layout>
        <Topics title={title} />
      </Layout>
    ),
  };
}

export default action;
