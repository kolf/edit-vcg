/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Menu, Icon } from 'antd'

import s from './Layout.less'
import logoUrl from './logo.svg'
import Sidebar from './Sidebar/Sidebar'
const SubMenu = Menu.SubMenu

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <div className={s.root + ' ant-layout'}>
        <div className={s.header + ' ant-layout-header'}>
          <span className={s.brand}>
            <img src={logoUrl} alt='logo' width='50' />
            VCG 内容管理系统
          </span>
          <Menu
            theme='dark'
            mode='horizontal'
            style={{ height: 46, float: 'right' }}
          >
            <Menu.Item key='star' className={s.star}>
              <Icon type='star' />
            </Menu.Item>
            <SubMenu key='h1' title='姜婧婧'>
              <Menu.Item key='h11'>退出</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className='ant-layout ant-layout-has-sider'>
          <Sidebar />
          <div className={s.content + ' ant-layout-content'}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Layout)
