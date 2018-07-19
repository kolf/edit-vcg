import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Radio, Tabs, Pagination, Button, Icon, Spin } from 'antd';
import FilterPager from 'components/FilterPager';
import withList from 'HOC/withList';
import gs from 'components/App.less';
import s from './ThumbList.less';

import { fetchTopicImages } from 'actions/topic';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

const assetOptions = [
  {
    value: 1,
    label: '已编译',
  },
  {
    value: 2,
    label: '全部',
  },
];

function Item({ onClick, oss176, id, title, selected }) {
  return (
    <Col span={4} key={id}>
      <div
        className={s.item + (selected ? ` ${s.active}` : '')}
        onClick={onClick}
      >
        <div className={s.picture}>
          <img src={oss176 || defaultThumb} alt={title} />
        </div>
        <h5 className={s.title}>2018-02-09 22:43:32</h5>
        <p className={s.caption}>
          ID：{id}
          <br />
          {title}
        </p>
      </div>
    </Col>
  );
}

function getSelected(list) {
  return list.filter(item => item.selected);
}

class ThumbList extends React.Component {
  static defaultProps = {
    list: [],
    total: 0,
    message: '加载中...',
  };

  state = {
    query: {
      topicId: this.props.topicId,
      pageNum: 1,
      pageSize: 60,
    },
  };

  componentDidMount() {
    this.fetchTopicImages();
  }

  handleChangeAsset = e => {
    const { value } = e.target;
    this.fetchTopicImages({
      desc: value,
    });
  };

  fetchTopicImages = param => {
    const { dispatch } = this.props;
    const { query } = this.state;
    if (param) {
      Object.assign(query, param);
    }

    dispatch(fetchTopicImages(query));
  };

  render() {
    const { errorMessage, isFetching, list } = this.props;
    const { query } = this.state;

    const List = withList(Item);

    return (
      <div className={s.root}>
        <div className={s.bar}>
          <RadioGroup
            defaultValue={1}
            onChange={this.handleChangeAsset}
            options={assetOptions}
          />
          <FilterPager
            isRight
            pageSize={query.pageSize}
            pageNum={query.pageNum}
            className={gs.fRight}
            onChange={this.fetchTopicImages}
            total={this.props.total}
          />
        </div>
        <List
          onClick={this.handleClick}
          isLoading={isFetching}
          error={errorMessage}
          items={list}
          className={s.list + ' ant-row'}
        />
        <div className="ant-row">
          <FilterPager
            pageSize={query.pageSize}
            pageNum={query.pageNum}
            className={gs.fRight}
            onChange={this.fetchTopicImages}
            total={this.props.total}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topic.fetchImageing,
    list: state.topic.imagesList,
    total: state.topic.imagesTotal,
    errorMessage: state.topic.imagesMessage,
  };
}

export default connect(mapStateToProps)(withStyles(s, gs)(ThumbList));
