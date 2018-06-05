import React from 'react';
import GroupTags from './GroupTags';
import Layout from '../../components/Layout';

async function action() {
  return {
    title: '编辑组照筛选',
    chunks: ['group-tags'],
    component: (
      <Layout>
        <GroupTags />
      </Layout>
    ),
  };
}

export default action;
