import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tag, Icon } from 'antd';
import s from './NavsGroup.less';

const Navs = ({ items = [], onClick, onClose }) => {
  return items
    .map(item => (
      <Tag onClick={() => onClick(item.navLevel, item)} key={item.navId}>
        {item.navName}
        <Icon type="cross" onClick={e => onClose(item, e)} />
      </Tag>
    ))
    .concat([
      <Tag style={{ color: '#f84949' }} onClick={() => onClick()}>
        添加三级<Icon type="plus" />
      </Tag>,
    ]);
};

const NavsGroup = ({ items = [], onClick, onClose }) => {
  function handleClose(item, e) {
    e.stopPropagation();
    onClose && onClose(item);
  }

  function handleClick(level, item, parentId, e) {
    e.stopPropagation();
    onClick && onClick(level, item, parentId);
  }

  return (
    <div className={s.root}>
      {items
        .map(item => (
          <div className={`${s.item} ant-row ant-form-item`}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
              <Tag
                color="#333"
                key={item.navId}
                title={item.navName}
                onClick={e => handleClick(2, item, '', e)}
              >
                {item.navName}
                <Icon type="cross" onClick={e => handleClose(item, e)} />
              </Tag>
            </div>
            <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-20">
              <div className="ant-form-item-control">
                <Navs
                  items={item.children}
                  onClose={handleClose}
                  onClick={nav => handleClick(3, nav, item.navId)}
                />
              </div>
            </div>
          </div>
        ))
        .concat(
          <div className={`${s.item} ant-row ant-form-item`}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
              <Tag color="#333" onClick={e => handleClick(2, null, '', e)}>
                添加二级<Icon type="plus" />
              </Tag>
            </div>
          </div>,
        )}
    </div>
  );
};

export default withStyles(s)(NavsGroup);
