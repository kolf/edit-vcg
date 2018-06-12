import React from 'react';
import SearchGroup from './SearchGroup';
import Layout from '../../components/Layout';

async function action() {
  return {
    title: '编辑组照筛选',
    chunks: ['search-group'],
    component: (
      <Layout>
        <SearchGroup />
      </Layout>
    ),
  };
}

export default action;
