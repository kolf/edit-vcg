/**
 * 专题前台页面
 *
 */

import React from 'react';
import Topic from './Topic';

function action({ params }) {
  return {
    title: '专题详情',
    chunks: ['topic'],
    component: <Topic {...params} />,
  };
}

export default action;
