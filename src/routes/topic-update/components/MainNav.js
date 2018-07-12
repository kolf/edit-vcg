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

  onTabClick = key => {
    this.setState({
      tabActiveKey: key,
    });

    if (key === '0') {
      this.showNavModal(1);
    }

    this.handleClick(key);
  };

  handleClick = id => {
    const { dispatch, topicId } = this.props;
    dispatch(activeTopicNav(id));
    dispatch(
      fetchTopicImages({
        navId: id,
        topicId,
        pageNum: 1,
        pageSize: 60,
      }),
    );
  };

  render() {
    const { navs, topicId, isFetching, activeId } = this.props;
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
            activeKey={tabActiveKey}
            animated={false}
            onTabClick={this.onTabClick}
          >
            {navs.map(nav => (
              <TabPane
                tab={
                  <span
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
                    <Icon type="cross" onClick={() => this.onDelete(nav)} />
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
            <TabPane
              tab={
                <span style={{ color: '#f84949' }}>
                  <Icon type="plus-circle" />添加一级
                </span>
              }
              key="0"
            >
              <div className={s.empty}>请添加一级导航~</div>
            </TabPane>
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
  };
}

export default connect(mapStateToProps)(withStyles(s)(MainNav));
