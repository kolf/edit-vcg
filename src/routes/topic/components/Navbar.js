import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input } from 'antd';
import { fetchTopic} from 'actions/topic';

const Search = Input.Search;

import s from './Navbar.less';
import logoUrl from '../assets/logo.svg';

class Navbar extends React.Component {
  static defaultProps = {
    title: '加载中...',
  };

  componentDidMount() {
    this.props.dispatch(fetchTopic({ id: this.props.topicId }));
  }

  render() {
    const { showTitle, showLogo } = this.props;

    return (
      <div className={s.root}>
        {showLogo && (
          <a className={s.logo}>
              <img src={logoUrl} width="100" alt="视觉中国" />
          </a>
        )}
        {showTitle && <h1 className={s.title}>2018俄罗斯世界杯</h1>}
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

function mapStateToProps(state) {
  return {
    title: state.topic.title,
    bannerUrl: state.topic.bannerUrl,
  };
}

export default withStyles(s)(connect(mapStateToProps)(Navbar));
