import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Affix } from 'antd';
import s from './Topbar.less';

class Topbar extends React.Component {
  constructor(props) {
    super(props);
  }

  openView = () => {
    window.open('/topic/11');
  };

  render() {
    return (
      <div className={s.topbar}>
        <div className="container">
          <div className={s.btns}>
            <Button onClick={this.openView}>预览</Button>
            <Button type="primary">发布</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Topbar);
