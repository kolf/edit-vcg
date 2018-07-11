import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tag, Icon } from 'antd';
import s from './NavsGroup.less';

const Navs = ({ items = [] }) =>
  items.map(item => <Tag key={item.navId}>{item.navName}</Tag>);

const NavsGroup = ({ items = [] }) => (
  <div className={s.root}>
    {items.map(item => (
      <div className={`${s.item} ant-row ant-form-item`}>
        <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
          <Tag color="#333" key={item.navId} title={item.navName}>
            {item.navName}
          </Tag>
        </div>
        <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-20">
          <div className="ant-form-item-control">
            <Navs items={item.children} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default withStyles(s)(NavsGroup);
