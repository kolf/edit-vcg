import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tag, Icon } from 'antd';
import s from './NavsGroup.less';

const Navs = ({
  items = [],
  onClick,
  onDoubleClick,
  onClose,
  hideAdd,
  activeKey,
}) =>
  items
    .map(item => {
      const isActive = activeKey === item.navId;
      let styles = {
        paddingRight: 18,
      };
      if (isActive) {
        styles = {
          ...styles,
          borderColor: '#f84949',
          color: '#f84949',
        };
      }
      return (
        <Tag
          onClick={e => onClick(item, e)}
          onDoubleClick={e => onDoubleClick(item, e)}
          key={item.navId}
          style={styles}
        >
          {item.navName}
          {onClose && (
            <Icon
              style={isActive ? { color: '#f84949' } : null}
              type="cross"
              onClick={e => onClose(item, e)}
            />
          )}
        </Tag>
      );
    })
    .concat(
      hideAdd ? (
        []
      ) : (
        <Tag style={{ color: '#f84949' }} onClick={e => onDoubleClick(null, e)}>
          <Icon type="plus-circle" /> 添加三级
        </Tag>
      ),
    );

const NavsGroup = ({
  items = [],
  onClick,
  onDoubleClick,
  onClose,
  hideAdd,
  activeKey,
}) => {
  function handleClose(item, e) {
    e.stopPropagation();
    onClose && onClose(item);
  }

  function handleClick(id, e) {
    e.stopPropagation();
    onClick && onClick(id);
  }

  function handleDbClick(level, item, parentId, e) {
    e.stopPropagation();
    onDoubleClick && onDoubleClick(level, item, parentId);
  }

  return (
    <div className={s.root}>
      {items
        .map(item => (
          <div className={`${s.item} ant-row ant-form-item`}>
            <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
              <Tag
                color={activeKey === item.navId ? '#b74635' : '#333'}
                key={item.navId}
                title={item.navName}
                onClick={e => handleClick(item.navId, e)}
                onDoubleClick={e => handleDbClick(2, item, '', e)}
                style={
                  onClose
                    ? {
                        paddingRight: 18,
                      }
                    : null
                }
              >
                {item.navName}
                {onClose && (
                  <Icon type="cross" onClick={e => handleClose(item, e)} />
                )}
              </Tag>
            </div>
            <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-20">
              <div className="ant-form-item-control">
                <Navs
                  activeKey={activeKey}
                  hideAdd={item.isAuto === '1'}
                  items={item.children}
                  onClose={handleClose}
                  onClick={(nav, e) => handleClick(nav.navId, e)}
                  onDoubleClick={(nav, e) =>
                    handleDbClick(3, nav, item.navId, e)
                  }
                />
              </div>
            </div>
          </div>
        ))
        .concat(
          hideAdd ? (
            []
          ) : (
            <div className={`${s.item} ant-row ant-form-item`}>
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-4">
                <Tag color="#333" onClick={e => handleDbClick(2, null, '', e)}>
                  <Icon type="plus-circle" /> 添加二级
                </Tag>
              </div>
            </div>
          ),
        )}
    </div>
  );
};

export default withStyles(s)(NavsGroup);
