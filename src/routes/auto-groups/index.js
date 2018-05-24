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
import AutoGroups from './AutoGroups';

const title = '自动成组管理';

function action() {
  return {
    chunks: ['auto-groups'],
    title,
    component: (
      <Layout>
        <AutoGroups title={title} />
      </Layout>
    ),
  };
}

export default action;
