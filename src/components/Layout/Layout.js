/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import Link from 'components/Link';

import s from './Layout.less';
import menuData from './menuData';
import logoUrl from './logo.svg';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    openKeys: ['1'],
    selectedKeys: ['11'],
  };

  changeSelect = menu => {
    const selectedKeys = menu.key;
    this.setState({
      selectedKeys,
    });
  };

  render() {
    const { openKeys, selectedKeys } = this.state;

    return (
      <div className={s.root + ' ant-layout'}>
        <div className={s.header + ' ant-layout-header'}>
          <span className={s.brand}>
            <img src={logoUrl} alt="logo" width="50" />
            VCG 内容管理系统
          </span>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ height: 46, float: 'right' }}
          >
            <Menu.Item key="star" className={s.star}>
              <Icon type="star" />
            </Menu.Item>
            <SubMenu key="h1" title="姜婧婧">
              <Menu.Item key="h11">退出</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="ant-layout ant-layout-has-sider">
          <div className={s.sider + ' ant-layout-sider'}>
            <div className="ant-layout-sider-children">
              <Menu
                className={s.siderMenu}
                mode="inline"
                onSelect={this.changeSelect}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
              >
                {menuData.map(m => {
                  if (m.children) {
                    return (
                      <SubMenu
                        key={m.id}
                        title={
                          <span>
                            <Icon type={m.icon} />
                            <span>{m.text}</span>
                          </span>
                        }
                      >
                        {m.children.map(c => (
                          <Menu.Item key={c.id}>
                            <Link to={c.path}>{c.text}</Link>
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    );
                  }
                  return (
                    <Menu.Item key={m.id}>
                      <Icon type={m.icon} />
                      <Link to={m.path}>{m.text}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </div>
          </div>
          <div className={s.content + ' ant-layout-content'}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(UserLayout);
