import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Icon, Modal } from 'antd';
import NavModal from './NavModal';
import s from './SideNav.less';

import { fetchTopicNavs } from 'actions/topicNavs';

const SubMenu = Menu.SubMenu;
const nav = [];
const NAVLOCATION = '1';

class SideNav extends React.Component {
  static defaultProps = {
    navs: [],
  };

  componentDidMount() {
    this.props.dispatch(
      fetchTopicNavs({ topicId: this.props.topicId, navLocation: NAVLOCATION }),
    );
  }
  state = {
    openKeys: ['sub1'],
    navModalVisible: false,
    level: 1, // 1 一级导航， 2， 二级导航
  };

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  showNavModal = level => {
    this.setState({ level, navModalVisible: true });
  };

  onCancelNavModal = () => {
    this.setState({ navModalVisible: false });
  };

  onOkNavModal = () => {
    this.setState({ navModalVisible: false });
  };

  handleClick = item => {
    const { key, domEvent } = item;
    domEvent.stopPropagation();
    if (key === 'add') {
      this.showNavModal(1);
    } else if (/addSub/.test(key)) {
      this.showNavModal(2);
    }
    console.log(item, key, domEvent.target);
  };

  remove = (navType, menu) => {
    Modal.confirm({
      title: `删除${navType === '1' ? '一' : '二'}级导航`,
      content: '删除菜单后，子菜单也会被删除',
      okText: '确认删除',
      cancelText: '我再想想',
      onOk() {
        console.log('OK');
      },
    });
  };

  render() {
    const { navs } = this.props;
    const { navModalVisible, level } = this.state;

    console.log(navs);

    return (
      <div className={s.root}>
        <NavModal
          navLevel={level}
          visible={navModalVisible}
          onCancel={this.onCancelNavModal}
          topicId={this.props.topicId}
          onOk={this.onOkNavModal}
          navLocation={NAVLOCATION}
        />
        <Menu
          onClick={this.handleClick}
          mode="vertical"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          selectable={false}
        >
          {navs.map(n => (
            <SubMenu
              className={s.subMenu}
              key={n.navId}
              title={
                <span
                  onDoubleClick={() => {
                    this.showNavModal(1, n);
                  }}
                  className={s.title}
                >
                  {n.navName}
                  <Icon
                    type="cross"
                    onClick={() => {
                      this.remove(1, n);
                    }}
                  />
                </span>
              }
            >
              {n.children &&
                n.children.map(c => (
                  <Menu.Item key={c.id}>
                    <span
                      onDoubleClick={() => {
                        this.showNavModal(2, c);
                      }}
                    >
                      {c.label}{' '}
                      <Icon
                        type="cross"
                        onClick={() => {
                          this.remove(2, c);
                        }}
                      />
                    </span>
                  </Menu.Item>
                ))}
              <Menu.Item key={`addSub${n.key}`} className={s.add}>
                添加
                <Icon type="plus" />
              </Menu.Item>
            </SubMenu>
          ))}
          <Menu.Item key="add" className={s.add}>
            添加
            <Icon type="plus" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.topicNavs.isFetching,
    navs: state.topicNavs.navs[NAVLOCATION],
  };
}

export default connect(mapStateToProps)(withStyles(s)(SideNav));
