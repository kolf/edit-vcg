import React from 'react';
import GroupItem from './GroupItem';

const GroupList = ({ items }) => {
  return <div>{items.map(item => <GroupItem {...item} />)}</div>;
};

export default GroupList;
