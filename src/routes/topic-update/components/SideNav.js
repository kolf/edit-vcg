import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Icon, Modal, Spin } from 'antd';
import NavModal from './NavModal';
import NavsGroup from './NavsGroup';
import s from './SideNav.less';

import { fetchTopicNavs, deleteTopicNav } from 'actions/topicNavs';

const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;
const levels = ['', '一', '二', '三'];
const NAVLOCATION = '1';

class SideNav extends React.Component {
  static defaultProps = {
    navs: [],
    isFetching: true,
  };

  componentDidMount() {
    this.fetchTopicNavs();
  }
  state = {
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
    console.log(level, nav, parentNavId);

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

  render() {
    const { navs, topicId, isFetching } = this.props;
    const { navModalVisible, level } = this.state;

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
          <Menu mode="vertical" selectable={false}>
            {navs.map(nav => (
              <SubMenu
                className={s.subMenu}
                key={nav.navId}
                title={
                  <span
                    onClick={() => this.showNavModal(1, nav)}
                    className={s.title}
                  >
                    {nav.navName}
                    <Icon type="cross" onClick={() => this.onDelete(nav)} />
                  </span>
                }
              >
                <div className={s.navGroup}>
                  <h3>{nav.navName}</h3>
                  <NavsGroup
                    items={nav.children}
                    onClose={this.onDelete}
                    onClick={(level, n, parentNavId) => {
                      const parentId = parentNavId || nav.navId;
                      this.showNavModal(level, n, parentId);
                    }}
                  />
                </div>
              </SubMenu>
            ))}
            <Menu.Item
              key="add"
              className={s.add}
              onClick={() => this.showNavModal(1)}
            >
              <Icon type="plus-circle" />添加一级
            </Menu.Item>
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
  };
}

export default connect(mapStateToProps)(withStyles(s)(SideNav));
