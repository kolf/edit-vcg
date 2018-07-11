import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MainNav from './components/MainNav';
import SideNav from './components/SideNav';
import ThumbList from './components/ThumbList';
import LayoutMask from 'components/LayoutMask';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import { fetchTopicSetting, setTopic } from 'actions/topic';
import gs from 'components/App.less';
import s from './TopicUpdate.less';

class TopicUpdate extends React.Component {
  static propTypes = {};

  static defaultProps = {
    settings: {
      isLeftNavShow: 1,
      isMainNavShow: 1,
      isMainContantShow: 1,
    },
  };

  componentDidMount() {
    this.fetchTopicSetting();
  }

  fetchTopicSetting = () => {
    const { dispatch, id } = this.props;
    dispatch(
      fetchTopicSetting({
        id,
      }),
    );
  };

  changeSetting = (key, value) => {
    const { settings, dispatch } = this.props;

    settings[key] = value;

    dispatch(
      setTopic({
        settings,
      }),
    );
  };

  render() {
    const {
      id,
      settings: { isLeftNavShow, isMainNavShow, isMainContantShow },
    } = this.props;

    return (
      <div className={s.root}>
        <Topbar topicId={id} />
        <div className={s.container}>
          <Navbar topicId={id} layoutMaskChange={this.changeSetting} />
          <div className={s.body}>
            <LayoutMask
              value={isLeftNavShow}
              bordered
              target="isLeftNavShow"
              onChange={this.changeSetting}
              style={{ marginRight: 16 }}
            >
              <SideNav topicId={id} />
            </LayoutMask>
            <div className={s.main}>
              <LayoutMask
                bordered
                target="isMainNavShow"
                value={isMainNavShow}
                style={{ marginBottom: 16 }}
                onChange={this.changeSetting}
              >
                <MainNav topicId={id} />
              </LayoutMask>
              <LayoutMask
                bordered
                value={isMainContantShow}
                target="isMainContantShow"
                onChange={this.changeSetting}
              >
                <ThumbList topicId={id} />
              </LayoutMask>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    settings: state.topic.settings,
    updateKey: state.topic.updateKey,
  };
}

export default withStyles(gs, s)(connect(stateToProps)(TopicUpdate));
