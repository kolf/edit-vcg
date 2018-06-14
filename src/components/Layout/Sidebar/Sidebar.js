import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import toRegExp from 'path-to-regexp';
import { Menu, Icon } from 'antd';
import s from './Sidebar.less';
import Link from 'components/Link';

const SubMenu = Menu.SubMenu;
const navs = [
  {
    key: '1',
    text: '专题管理',
    icon: 'user',
    children: [
      {
        key: '11',
        text: '编辑类图片专题',
        path: '/topics',
      },
      {
        key: '12',
        text: '自动抓图成组上线',
        path: '/auto-groups',
      },
    ],
  },
  {
    key: '2',
    text: '编辑组照筛选',
    path: '/search-group',
    icon: 'filter',
  },
];

function getSelectedKey(navs) {
  const { pathname } = window.location;
  const nav = navs.find(nav => nav.path === pathname);
  return nav ? nav.key : '';
}

class Sidebar extends PureComponent {
  state = {
    openKeys: [],
    selectedKeys: [],
  };

  componentDidMount() {
    this.initOpenKeys();
  }

  initOpenKeys = () => {
    let selectedKey = getSelectedKey(navs);
    if (selectedKey) {
      this.setState({
        selectedKeys: [selectedKey],
      });
    } else {
      let nav = navs.find(nav => {
        selectedKey = getSelectedKey(nav.children);
        return true;
      });

      if (nav) {
        if (selectedKey) {
          this.state.selectedKeys = selectedKey;
        }

        this.setState({
          openKeys: [nav.key],
        });
      }

      console.log(nav);
    }
  };

  handleClick = ({ key }) => {
    this.setState({
      selectedKeys: [key],
    });
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (navs.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const { openKeys, selectedKeys } = this.state;

    return (
      <div className={s.root + ' ant-layout-sider'}>
        <div className="ant-layout-sider-children">
          <Menu
            selectedKeys={selectedKeys}
            className={s.menu}
            mode="inline"
            onClick={this.handleClick}
            onSelect={this.handleChange}
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
          >
            {navs.map(
              nav =>
                nav.children ? (
                  <SubMenu
                    key={nav.key}
                    title={
                      <span>
                        <Icon type={nav.icon} />
                        <span>{nav.text}</span>
                      </span>
                    }
                  >
                    {nav.children.map(c => (
                      <Menu.Item key={c.key}>
                        <Link to={c.path}>{c.text}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  <Menu.Item key={nav.key}>
                    <Icon type={nav.icon} />
                    <Link className={s.link} to={nav.path}>
                      {nav.text}
                    </Link>
                  </Menu.Item>
                ),
            )}
          </Menu>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Sidebar);
