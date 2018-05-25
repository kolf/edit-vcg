/**
 * 专题前台页面
 *
 */

import React from 'react';
import TopicUpdate from './TopicUpdate';

const title = 'VCG专题111';

function action({ params }) {
  return {
    chunks: ['topic-update'],
    title,
    component: <TopicUpdate {...params} title={title} />,
  };
}

export default action;
