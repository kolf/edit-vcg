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
import logoUrl from './logo_Dark.svg';

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
      <Layout className={s.root}>
        <Header style={{ height: 46, padding: '0 24px' }}>
          <span className={s.brand}>
            <img src={logoUrl} alt="logo" width="50" />
            VCG 内容管理系统
          </span>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ height: 46, float: 'right' }}
          >
            <Menu.Item key="h2" className={s.star}>
              <Icon type="star" />
            </Menu.Item>
            <SubMenu key="h1" title="姜婧婧">
              <Menu.Item key="h11">退出</Menu.Item>
            </SubMenu>
          </Menu>
        </Header>
        <Layout style={{ backgroundColor: '#fff' }}>
          <Sider
            width={190}
            style={{ background: '#f8f8f8', borderRight: '1px solid #ccc' }}
          >
            <Menu
              mode="inline"
              style={{
                height: '100%',
                borderRight: 0,
                backgroundColor: '#f2f2f2',
              }}
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
          </Sider>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withStyles(s)(UserLayout);
