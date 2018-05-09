import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Button, Icon } from 'antd';
import LayoutMask from 'components/LayoutMask';

const Search = Input.Search;
const ButtonGroup = Button.Group;

import s from './Navbar.less';
import logoUrl from '../assets/logo.svg';

class Navbar extends React.Component {
  render() {
    const { toggleLayerChange } = this.props;
    return (
      <div className={s.root}>
        <div className={s.header}>
          <LayoutMask
            style={{
              display: 'inline-block',
              paddingRight: 60,
              paddingTop: 10,
            }}
            target="logo"
            onChange={toggleLayerChange}
          >
            <a className={s.logo}>
              <img src={logoUrl} width="100" alt="视觉中国" />
            </a>
          </LayoutMask>
          <h1 className={s.title}>
            <LayoutMask
              style={{
                display: 'inline-block',
                paddingRight: 60,
                paddingTop: 10,
              }}
              target="title"
              onChange={toggleLayerChange}
            >
              2018俄罗斯世界杯
            </LayoutMask>
          </h1>
          <div className={s.search}>
            <Search
              placeholder="专题内搜索"
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
        </div>
        <div className={s.btns}>
          <ButtonGroup size="small">
            <Button type="primary">修改</Button>
            <Button>删除</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navbar);
