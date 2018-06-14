import React from 'react';
import { Tag, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './TagGroup.css';

const Placeholder = ({ text }) => <div className={s.placeholder}>{text}</div>;

const TagGroup = ({ items = [], onClick, onClose, placeholder }) => {
  function handleClose(item, e) {
    e.stopPropagation();
    onClose && onClose(item);
  }

  function handleClick(item, level, parentId, e) {
    e.stopPropagation();
    onClick && onClick(item, level, parentId);
  }

  if (items.length === 0) {
    return (
      <Placeholder
        text={placeholder || '该组照没有筛选项，请点击右上角进行添加'}
      />
    );
  }

  return (
    <div className={s.root}>
      {items.sort((a, b) => a.sort - b.sort).map(item => (
        <div className="ant-row ant-form-item">
          <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
            <Tag
              title={item.name}
              key={item.id}
              color="#333"
              onClick={e => handleClick(item, 1, '', e)}
              style={
                onClose
                  ? {
                      paddingRight: 18,
                    }
                  : null
              }
            >
              {item.name}
              {onClose && (
                <Icon type="cross" onClick={e => handleClose(item, e)} />
              )}
            </Tag>
          </div>
          <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-20">
            <div className="ant-form-item-control">
              {item.children &&
                item.children.sort((a, b) => a.sort - b.sort).map(t => (
                  <Tag
                    key={t.id}
                    onClick={e => handleClick(t, 2, item.id, e)}
                    title={t.name}
                    style={
                      onClose
                        ? {
                            paddingRight: 18,
                          }
                        : null
                    }
                  >
                    {t.name}
                    {onClose && (
                      <Icon type="cross" onClick={e => handleClose(t, e)} />
                    )}
                  </Tag>
                ))}
              {onClose && (
                <Tag
                  key="cross"
                  onClick={e => handleClick(null, 2, item.id, e)}
                >
                  <Icon type="plus-circle" /> 二级筛选项
                </Tag>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withStyles(s)(TagGroup);
