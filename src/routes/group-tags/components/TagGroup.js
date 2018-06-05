import React from 'react';
import { Tag, Icon } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './TagGroup.css';

const TagGroup = ({ items = [], onClick, onClose }) => {
  function handleClose(item, e) {
    e.stopPropagation();
    onClose && onClose(item);
  }

  function handleClick(item, e) {
    e.stopPropagation();
    onClick && onClick(item);
  }

  return (
    <div className={s.root}>
      {items.map(item => (
        <div className="ant-row ant-form-item">
          <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-3">
            <Tag key={item.id} color="#333" onClick={e => handleClick(item, e)}>
              {item.name}
              {onClose && (
                <Icon type="cross" onClick={e => handleClose(item, e)} />
              )}
            </Tag>
          </div>
          <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-21">
            <div className="ant-form-item-control">
              {item.children &&
                item.children.map(t => (
                  <Tag key={t.id} onClick={e => handleClick(item, e)}>
                    {t.name}
                    {onClose && (
                      <Icon type="cross" onClick={e => handleClose(item, e)} />
                    )}
                  </Tag>
                ))}
              {onClose && (
                <Tag key="cross" onClick={e => handleClick(null, e)}>
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

TagGroup.defaultProps = {
  items: [
    {
      name: '授权类型',
      id: '1',
      children: [
        { name: 'RM', id: 11 },
        { name: 'RF', id: 12 },
        { name: '图片类型', id: 13 },
        { name: '摄影照片', id: 14 },
        { name: '插画', id: 15 },
        { name: '矢量图', id: 16 },
        { name: 'PSD素材', id: 17 },
        { name: '动图', id: 18 },
      ],
    },
    {
      name: '构图',
      id: '2',
      children: [
        { name: '横图', id: 21 },
        { name: '竖图', id: 22 },
        { name: '方图', id: 23 },
        { name: '全景', id: 24 },
        { name: '色彩', id: 25 },
        { name: '彩色', id: 26 },
        { name: '黑白', id: 27 },
      ],
    },
    {
      name: '品牌',
      id: '3',
      children: [
        { name: '500px Select RM', id: 31 },
        { name: 'Corbis-RF', id: 32 },
        { name: 'Moment-RF', id: 33 },
        { name: 'Stone-RM', id: 34 },
        { name: '美好景象-RF', id: 35 },
        { name: 'E+-RF', id: 36 },
        { name: 'Vetta-RF', id: 37 },
      ],
    },
    {
      name: '人物',
      id: '4',
      children: [
        { name: '梅西', id: '40' },
        { name: '罗纳尔多', id: '42' },
        { name: '贝利', id: '44' },
        { name: '内马尔·达席尔瓦', id: '46' },
        { name: '马拉多纳', id: '48' },
        { name: '路易斯·阿尔贝托·苏亚雷斯', id: '410' },
        { name: '克里斯蒂亚诺·罗纳尔多（C罗）', id: '412' },
        { name: '安德雷斯·伊涅斯塔', id: '414' },
        { name: '哈维·埃尔南德兹·克雷乌斯', id: '416' },
        { name: '贝克汉姆', id: '418' },
        { name: '罗纳尔迪尼奥', id: '420' },
        { name: '罗马里奥', id: '422' },
        { name: '克鲁伊夫', id: '424' },
        { name: '巴蒂斯图塔', id: '426' },
        { name: '贝肯鲍尔', id: '428' },
        { name: '瑞恩·吉格斯', id: '430' },
        { name: '博比·查尔顿', id: '432' },
      ],
    },
  ],
};

export default withStyles(s)(TagGroup);
