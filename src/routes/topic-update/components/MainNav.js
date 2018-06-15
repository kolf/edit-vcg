import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tag, Icon, Button, Modal } from 'antd';
import NavModal from './NavModal';
import NavsGroup from './NavsGroup';
import s from './MainNav.less';
import { fetchTopicNavs, deleteTopicNav } from 'actions/topicNavs';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const levels = ['', '一', '二', '三'];
const NAVLOCATION = '0';

class MainNav extends React.Component {
  static defaultProps = {
    navs: [],
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
    const { navs, topicId } = this.props;
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
        <Tabs animated={false}>
          {navs.map(nav => (
            <TabPane
              tab={
                <span onDoubleClick={() => this.showNavModal(1, nav)}>
                  {nav.navName}
                  <Icon type="cross" onClick={() => this.onDelete(nav)} />
                </span>
              }
              key={nav.navId}
            >
              <NavsGroup
                items={nav.children}
                onClose={this.onDelete}
                onClick={(level, n, parentNavId) => {
                  let parentId = parentNavId || nav.navId;
                  this.showNavModal(level, n, parentId);
                }}
              />
            </TabPane>
          ))}
          <TabPane
            tab={
              <span
                style={{ color: '#f84949' }}
                onClick={() => this.showNavModal(1)}
              >
                添加一级<Icon type="plus" />
              </span>
            }
            key="0"
          >
            <div className={s.empty}>请添加一级导航~</div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topicNavs.isFetching,
    navs: state.topicNavs.navs[NAVLOCATION],
  };
}

export default connect(mapStateToProps)(withStyles(s)(MainNav));
