/**
 * 专题前台页面
 *
 */

import React from 'react';
import Layout from '../../components/Layout/BlankLayout';
import Topic from './Topic';

const title = 'VCG专题';

function action() {
  return {
    chunks: ['topic'],
    title,
    component: <Topic title={title} />,
  };
}

export default action;
