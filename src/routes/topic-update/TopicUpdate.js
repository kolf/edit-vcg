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
import storage from 'utils/localStorage';
import { fetchTopicSetting } from 'actions/topic';
import gs from 'components/App.less';
import s from './TopicUpdate.less';

class TopicUpdate extends React.Component {
  static propTypes = {};

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

  modulesValue = {
    title: '1',
    banner: '1',
    sideNav: '1',
    logo: '1',
    mainNav: '1',
    imgList: '1',
  };

  changeModules = (key, checked) => {
    const value = checked ? '1' : '0';
    this.modulesValue[key] = value;

    storage.set('topicModules', JSON.stringify(this.modulesValue));
  };

  render() {
    return (
      <div className={s.root}>
        <Topbar topicId={this.props.id} />
        <div className={s.container}>
          <Navbar topicId={this.props.id} moduleChange={this.changeModules} />
          <div className={s.body}>
            <LayoutMask
              bordered={true}
              target="sideNav"
              onChange={this.changeModules}
              style={{ marginRight: 16 }}
            >
              <SideNav topicId={this.props.id} />
            </LayoutMask>
            <div className={s.main}>
              <LayoutMask
                bordered={true}
                target="mainNav"
                style={{ marginBottom: 16 }}
                onChange={this.changeModules}
              >
                <MainNav topicId={this.props.id} />
              </LayoutMask>
              <LayoutMask
                bordered={true}
                target="imgList"
                onChange={this.changeModules}
              >
                <ThumbList row={4} />
              </LayoutMask>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(gs, s)(connect()(TopicUpdate));
