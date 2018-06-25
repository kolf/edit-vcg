import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { updateTopicSetting } from 'actions/topic';
import { Button } from 'antd';
import s from './Topbar.less';

class Topbar extends PureComponent {
  openView = () => {
    window.open(`/topic/${topicId}`);
  };

  pulish = () => {
    const { topicId, dispatch, settings } = this.props;

    dispatch(
      updateTopicSetting({
        topicId,
        ...settings,
      }),
    );
    console.log(this.props);
  };

  render() {
    const { isUpdateing } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.btns}>
            <Button onClick={this.openView}>预览</Button>
            <Button loading={isUpdateing} type="primary" onClick={this.pulish}>
              发布
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function stateToProp(state) {
  return {
    isUpdateing: state.topic.isUpdateing,
    settings: state.topic.settings,
  };
}

export default withStyles(s)(connect(stateToProp)(Topbar));
