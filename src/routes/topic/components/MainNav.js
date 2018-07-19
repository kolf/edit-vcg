import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tag, Icon, Button, Modal, Spin } from 'antd';
import NavModal from './NavModal';
import NavsGroup from './NavsGroup';
import s from './MainNav.less';
import { fetchTopicImages } from 'actions/topic';
import { fetchTopicNavs, activeTopicNav } from 'actions/topicNavs';

const TabPane = Tabs.TabPane;
const NAVLOCATION = '0';
let timer = null;

class MainNav extends React.Component {
  static defaultProps = {
    navs: [],
    isFetching: true,
  };

  componentDidMount() {
    this.fetchTopicNavs();
  }

  state = {
    tabActiveKey: '',
  };

  fetchTopicNavs = () => {
    this.props.dispatch(
      fetchTopicNavs({ topicId: this.props.topicId, navLocation: NAVLOCATION }),
    );
  };

  onTabClick = nav => {
    const { navId } = nav;

    this.handleClick(nav, () => {
      this.setState({
        tabActiveKey: navId,
      });
    });
  };
  handleClick = ({ navId, link }, callback) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (link) {
        window.open('//' + link);
        return;
      }

      const { dispatch, topicId } = this.props;
      dispatch(activeTopicNav(navId, NAVLOCATION));
      dispatch(
        fetchTopicImages({
          navId,
          topicId,
          pageNum: 1,
          pageSize: 60,
        }),
      );

      callback && callback();
    }, 300);
  };
  render() {
    const { navs, topicId, isFetching, activeId, currentLocation } = this.props;
    const { navModalVisible, level, tabActiveKey } = this.state;

    if (navs.length === 0) {
      return null;
    }

    return (
      <div className={s.root}>
        <Spin spinning={isFetching}>
          <Tabs
            activeKey={currentLocation === NAVLOCATION ? tabActiveKey : '0'}
            animated={false}
          >
            {navs.map(nav => (
              <TabPane
                tab={
                  <span
                    onClick={e => {
                      e.stopPropagation();
                      this.onTabClick(nav);
                    }}
                  >
                    {nav.navName}
                  </span>
                }
                key={nav.navId}
              >
                <NavsGroup
                  activeKey={activeId}
                  items={nav.children}
                  onClick={this.handleClick}
                />
              </TabPane>
            ))}
          </Tabs>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topicNavs[NAVLOCATION].isFetching,
    navs: state.topicNavs[NAVLOCATION].tree,
    activeId: state.topicNavs.activeId,
    currentLocation: state.topicNavs.currentLocation,
  };
}

export default connect(mapStateToProps)(withStyles(s)(MainNav));
