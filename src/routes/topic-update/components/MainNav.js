import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Icon, Modal, Spin, message } from 'antd';
import NavModal from './NavModal';
import NavsGroup from './NavsGroup';
import s from './MainNav.less';
import { fetchTopicImages } from 'actions/topic';
import {
  fetchTopicNavs,
  deleteTopicNav,
  activeTopicNav,
} from 'actions/topicNavs';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const levels = ['', '一', '二', '三'];
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
    tabActiveKey: '0',
    navModalVisible: false,
    level: 1, // 1 一级导航， 2， 二级导航
  };

  fetchTopicNavs = () => {
    this.modalNavValue = null;
    this.parentNavId = '';

    this.props.dispatch(
      fetchTopicNavs({ topicId: this.props.topicId, navLocation: NAVLOCATION }),
    );
  };

  showNavModal = (level, nav, parentNavId = '') => {
    clearTimeout(timer);
    this.modalNavValue = nav;
    this.parentNavId = parentNavId;

    this.setState({
      level,
      navModalVisible: true,
    });
  };

  onDelete = ({ navLevel, navId }) => {
    const onOk = () => {
      const { dispatch } = this.props;
      dispatch(deleteTopicNav({ navId })).then(msg => {
        this.fetchTopicNavs();
        this.state.tabActiveKey = '0';
      });
    };

    confirm({
      title: `删除${levels[navLevel]}级导航`,
      content: '删除菜单后，子菜单也会被删除',
      okText: '确认删除',
      cancelText: '我再想想',
      onOk,
    });
  };

  navModalCancel = () => {
    this.setState({
      navModalVisible: false,
    });
  };

  navModalOk = () => {
    this.state.navModalVisible = false;
    this.fetchTopicNavs();
  };

  onTabClick = nav => {
    const { navId } = nav;

    if (!navId) {
      this.showNavModal(1);
    } else {
      this.handleClick(nav, () => {
        this.setState({
          tabActiveKey: navId,
        });
      });
    }
  };

  handleClick = ({ navId, link, buildGroup }, callback) => {
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
          buildGroup,
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

    return (
      <div className={s.root}>
        <NavModal
          navLevel={level}
          visible={navModalVisible}
          onCancel={this.navModalCancel}
          onOk={this.navModalOk}
          navLocation={NAVLOCATION}
          topicId={topicId}
          value={this.modalNavValue}
          parentNavId={this.parentNavId}
        />
        <Spin spinning={isFetching}>
          <Tabs
            activeKey={currentLocation === NAVLOCATION ? tabActiveKey : '0'}
            animated={false}
          >
            <TabPane
              tab={
                <span
                  onClick={e => {
                    e.stopPropagation();
                    this.onTabClick({});
                  }}
                  style={{ color: '#f84949' }}
                >
                  <Icon type="plus-circle" />添加一级
                </span>
              }
              key="0"
            >
              <div className={s.empty}>请添加一级导航~</div>
            </TabPane>
            {navs.map(nav => (
              <TabPane
                tab={
                  <span
                    onClick={e => {
                      e.stopPropagation();
                      this.onTabClick(nav);
                    }}
                    onDoubleClick={e => {
                      e.stopPropagation();
                      if (nav.isAuto === '1') {
                        message.info('自动导航不可修改！');
                        return false;
                      }
                      this.showNavModal(1, nav);
                    }}
                  >
                    {nav.navName}
                    <Icon
                      type="cross"
                      onClick={e => {
                        e.stopPropagation();
                        this.onDelete(nav);
                      }}
                    />
                  </span>
                }
                key={nav.navId}
              >
                <NavsGroup
                  activeKey={activeId}
                  hideAdd={nav.isAuto === '1'}
                  items={nav.children}
                  onClose={this.onDelete}
                  onClick={this.handleClick}
                  onDoubleClick={(level, n, parentNavId) => {
                    if (n && n.isAuto === '1') {
                      message.info('自动导航不可修改！');
                      return false;
                    }
                    const parentId = parentNavId || nav.navId;
                    this.showNavModal(level, n, parentId);
                  }}
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
