import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Card, Button, Tag, Icon } from 'antd';
import TagGroup from './TagGroup'

import s from './GroupItem.less';

const GroupItem = ({ oss176, title, tags, id, onClick, onClose }) => {
  return (
    <div className={s.root}>
      <Row gutter={16}>
        <Col span={4}>
          <div className={s.img}>
            <img src={oss176} />
          </div>
        </Col>
        <Col span={20}>
          <div className={s.heading}>
            <p className={s.title} title={title}>
              <span className={s.marginRight20}>组照ID: {id}</span>
              <span>组照标题: {title}</span>
            </p>
            <span className={s.btns}>
              <Button icon="plus-circle" onClick={onClick}>
                一级筛选项
              </Button>
            </span>
          </div>
          <div className={s.connect}>
            <TagGroup items={tags} onClick={onClick} onClose={onClose} />
          </div>
        </Col>
      </Row>
      <Button className={s.delete} size="small" type="primary" icon="cross" />
    </div>
  );
};

export default withStyles(s)(GroupItem);
