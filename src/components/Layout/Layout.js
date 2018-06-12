import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Icon } from 'antd';

import s from './Layout.less';
import logoUrl from './logo.svg';
import Sidebar from './Sidebar/Sidebar';

import { logoutUser, loginUser } from 'actions/user';
import history from '../../history';

const SubMenu = Menu.SubMenu;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {
    user: {},
  };

  componentDidMount() {
    const { userId } = this.props.user;
    if (!userId) {
      this.getUser();
    }
  }

  getUser = () => {
    let token = localStorage.getItem('id_token');
    if (token) {
      this.props.dispatch(loginUser({ token }));
    } else {
      history.replace('/login');
    }
  };

  logout = () => {
    this.props.dispatch(logoutUser()).then(msg => {
      history.replace('/login');
    });
  };

  handleStarClick = () => {
    window.open('//edit.vcg.com/user/favorites');
  };

  render() {
    const { user } = this.props;
    return (
      <div className={s.root + ' ant-layout'}>
        <div className={s.header + ' ant-layout-header'}>
          <span className={s.brand}>
            <img src={logoUrl} alt="logo" width="50" />
            VCG 内容管理系统
          </span>
          <Menu
            selectable={false}
            theme="dark"
            mode="horizontal"
            style={{ height: 46, float: 'right' }}
          >
            <Menu.Item
              key="star"
              className={s.star}
              onClick={this.handleStarClick}
            >
              <Icon type="star" />
            </Menu.Item>
            <SubMenu key="h1" title={user.userName}>
              <Menu.Item key="h11" onClick={this.logout}>
                退出
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="ant-layout ant-layout-has-sider">
          <Sidebar />
          <div className={s.content + ' ant-layout-content'}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.auth.user,
  };
}

export default withStyles(s)(connect(mapState)(Layout));
