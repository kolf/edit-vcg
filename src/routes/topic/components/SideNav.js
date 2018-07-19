import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Icon, Spin } from 'antd';
import NavsGroup from './NavsGroup';
import s from './SideNav.less';
import { fetchTopicImages } from 'actions/topic';
import {
  fetchTopicNavs,
  activeTopicNav,
} from 'actions/topicNavs';

const SubMenu = Menu.SubMenu;
const NAVLOCATION = '1';
let timer = null;

class SideNav extends React.Component {
  static defaultProps = {
    navs: [],
    isFetching: true,
  };

  componentDidMount() {
    this.fetchTopicNavs();
  }
  state = {
    tabActiveKey: '0',
  };

  fetchTopicNavs = () => {
    this.modalNavValue = null;
    this.parentNavId = '';

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
    const { navs, isFetching, activeId, currentLocation } = this.props;
    const { tabActiveKey } = this.state;

    return (
      <div className={s.root}>
        <Spin spinning={isFetching}>
          <Menu mode="vertical" selectable={false}>
            {navs.map(
              nav =>
                nav.isAuto === '1' ? (
                  <Menu.Item
                    className={
                      tabActiveKey === nav.navId &&
                      currentLocation === NAVLOCATION
                        ? s.subMenu + ' ' + s.active
                        : s.subMenu
                    }
                    onClick={e => {
                      this.onTabClick(nav);
                    }}
                    key={nav.navId}
                  >
                    {nav.navName}
                  </Menu.Item>
                ) : (
                  <SubMenu
                    className={
                      tabActiveKey === nav.navId
                        ? s.subMenu + ' ' + s.active
                        : s.subMenu
                    }
                    key={nav.navId}
                    title={
                      <span
                        onClick={e => {
                          e.stopPropagation();
                          this.onTabClick(nav);
                        }}
                        className={s.title}
                      >
                        {nav.navName}
                      </span>
                    }
                  >
                    <div className={s.navGroup}>
                      <h3>{nav.navName}</h3>
                      <NavsGroup
                        activeKey={activeId}
                        hideAdd={nav.isAuto === '1'}
                        items={nav.children}
                        onClick={this.handleClick}
                      />
                    </div>
                  </SubMenu>
                ),
            )}
          </Menu>
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

export default connect(mapStateToProps)(withStyles(s)(SideNav));
