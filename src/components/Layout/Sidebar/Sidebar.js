import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import toRegExp from 'path-to-regexp'
import { Menu, Icon } from 'antd'
import s from './Sidebar.less'
import Link from 'components/Link'

const SubMenu = Menu.SubMenu
const navs = [
  {
    id: '1',
    text: '专题管理',
    icon: 'user',
    children: [
      {
        id: '11',
        text: '编辑类图片专题',
        path: 'topics',
        icon: 'user'
      },
      {
        id: '12',
        text: '自动抓图成组上线',
        path: 'auto-groups',
        icon: 'user'
      }
    ]
  }
]

function matchURI (path, uri) {
  const keys = []
  const pattern = toRegExp(path, keys) // TODO: Use caching
  const match = pattern.exec(uri)
  if (!match) return null
  const params = Object.create(null)
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i] !== undefined ? match[i] : undefined
  }
  return params
}

class Sidebar extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    openKeys: ['1'],
    selectedKeys: ['11']
  }

  componentWillMount () {
    console.log('------------------', this)
  }

  handleChange = menu => {
    const selectedKeys = [menu.key]
    this.setState({
      selectedKeys
    })
  }

  render () {
    const { openKeys, selectedKeys } = this.state

    return (
      <div className={s.root + ' ant-layout-sider'}>
        <div className='ant-layout-sider-children'>
          <Menu
            className={s.menu}
            mode='inline'
            onSelect={this.handleChange}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
          >
            {navs.map(
              nav =>
                (nav.children
                  ? <SubMenu
                    key={nav.id}
                    title={
                      <span>
                        <Icon type={nav.icon} />
                        <span>{nav.text}</span>
                      </span>
                      }
                    >
                    {nav.children.map(c => (
                      <Menu.Item key={c.id}>
                        <Link to={c.path}>{c.text}</Link>
                      </Menu.Item>
                      ))}
                  </SubMenu>
                  : <Menu.Item key={nav.id}>
                    <Icon type={nav.icon} />
                    <Link to={nav.path}>{nav.text}</Link>
                  </Menu.Item>)
            )}
          </Menu>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Sidebar)
