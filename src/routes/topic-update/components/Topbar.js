import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'antd';
import s from './Topbar.less';

const Topbar = ({ topicId }) => {
  const openView = () => {
    window.open(`/topic/${topicId}`);
  };
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.btns}>
          <Button onClick={openView}>预览</Button>
          <Button type="primary">发布</Button>
        </div>
      </div>
    </div>
  );
};

export default withStyles(s)(Topbar);
