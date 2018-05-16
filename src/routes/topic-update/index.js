/**
 * 专题前台页面
 *
 */

import React from 'react';
import TopicUpdate from './TopicUpdate';

const title = 'VCG专题';

function action() {
  return {
    chunks: ['topic-update'],
    title,
    component: <TopicUpdate title={title} />,
  };
}

export default action;
