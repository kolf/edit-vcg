import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Icon, Modal, Spin } from 'antd';
import NavModal from './NavModal';
import NavsGroup from './NavsGroup';
import s from './SideNav.less';

import { fetchTopicNavs } from 'actions/topicNavs';

const SubMenu = Menu.SubMenu;
const NAVLOCATION = '1';

class SideNav extends React.Component {
  static defaultProps = {
    navs: [],
    isFetching: true,
  };

  componentDidMount() {
    this.fetchTopicNavs();
  }
  fetchTopicNavs = () => {
    this.modalNavValue = null;
    this.parentNavId = '';

    this.props.dispatch(
      fetchTopicNavs({ topicId: this.props.topicId, navLocation: NAVLOCATION }),
    );
  };
  render() {
    const { navs, isFetching } = this.props;
    return (
      <div className={s.root}>
        <Spin spinning={isFetching}>
          <Menu className={s.menu} selectable={false} mode="vertical">
            {navs.map(nav => (
              <SubMenu
                className={s.subMenu}
                key={nav.navId}
                title={nav.navName}
              >
                <div className={s.navGroup}>
                  <h3>{nav.navName}</h3>
                  <NavsGroup items={nav.children} />
                </div>
              </SubMenu>
            ))}
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
