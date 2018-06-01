/**
 * 专题前台页面
 *
 */

import React from 'react';
import TopicUpdate from './TopicUpdate';

function action({ params }) {
  return {
    title: '编辑专题详情',
    chunks: ['topic-update'],
    component: <TopicUpdate {...params} />,
  };
}

export default action;
