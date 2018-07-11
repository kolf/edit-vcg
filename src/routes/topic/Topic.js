import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MainNav from './components/MainNav';
import SideNav from './components/SideNav';
import ThumbList from './components/ThumbList';
import Navbar from './components/Navbar';
import { fetchTopicSetting } from 'actions/topic';
import gs from 'components/App.less';
import s from './Topic.less';

class Topic extends React.Component {
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

  render() {
    const {
      id,
      settings: { isLeftNavShow, isMainNavShow, isMainContantShow },
    } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navbar topicId={id} showTitle={1} showLogo={1} />
          <div className={s.body}>
            {isLeftNavShow === 1 && <SideNav topicId={id} />}
            <div className={s.main}>
              {isMainNavShow === 1 && <MainNav topicId={id} />}
              {isMainContantShow === 1 && <ThumbList topicId={id} row={4} />}
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
  };
}

export default withStyles(gs, s)(connect(stateToProps)(Topic));
