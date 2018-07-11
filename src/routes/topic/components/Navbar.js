import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input } from 'antd';
import { fetchTopic } from 'actions/topic';

const Search = Input.Search;

import s from './Navbar.less';
import logoUrl from '../assets/logo.svg';

class Navbar extends React.Component {
  static defaultProps = {
    title: '加载中...',
    isLogoShow: 0,
    isTitleShow: 0,
  };

  componentDidMount() {
    this.props.dispatch(fetchTopic({ id: this.props.topicId }));
  }

  render() {
    const { title, bannerUrl, isLogoShow, isTitleShow } = this.props;

    const bgStyle = bannerUrl
      ? {
          backgroundImage: `url(${bannerUrl})`,
        }
      : {
          paddingLeft: 0,
          paddingRight: 0,
        };

    return (
      <div className={s.root} style={bgStyle}>
        {isLogoShow === 1 && (
          <a className={s.logo}>
            <img src={logoUrl} width="100" alt="视觉中国" />
          </a>
        )}
        {isTitleShow === 1 && <h1 className={s.title}>{title}</h1>}
        <div className={s.search}>
          <Search
            placeholder="专题内搜索"
            onSearch={value => console.log(value)}
            enterButton
          />
        </div>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    title: state.topic.title,
    bannerUrl: state.topic.bannerUrl,
    isTitleShow: state.topic.settings.isTitleShow,
    isLogoShow: state.topic.settings.isLogoShow,
  };
}

export default withStyles(s)(connect(stateToProps)(Navbar));
