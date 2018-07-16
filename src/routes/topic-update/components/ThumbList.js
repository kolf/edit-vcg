import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Button, Spin, message } from 'antd';
import FilterPager from 'components/FilterPager';
import FetchPlaceholder from 'components/FetchPlaceholder';
import withList from 'HOC/withList';
import gs from 'components/App.less';
import s from './ThumbList.less';

import { fetchTopicImages, setTopic, deleteTopicImages } from 'actions/topic';

const ButtonGroup = Button.Group;

const selectBtns = ['全选', '反选', '取消'];
const defaultThumb = require('../assets/logo-white.svg');

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

  handleClick = ({ id, active }) => {
    const { dispatch } = this.props;

    const imagesList = this.props.list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          selected: !active,
        };
      }
      return item;
    });

    dispatch(
      setTopic({
        imagesList,
      }),
    );
  };

  fetchTopicImages = param => {
    const { dispatch } = this.props;
    const { query } = this.state;
    if (param) {
      Object.assign(query, param);
    }

    dispatch(fetchTopicImages(query));
  };

  handleSelectClick = (e, key) => {
    e.stopPropagation();
    const { dispatch, list } = this.props;
    let imagesList = [];
    if (key === 0) {
      imagesList = list.map(item => ({
        ...item,
        selected: true,
      }));
    } else if (key === 1) {
      imagesList = list.map(item => ({
        ...item,
        selected: !item.selected,
      }));
    } else if (key === 2) {
      imagesList = list.map(item => ({
        ...item,
        selected: false,
      }));
    }

    dispatch(
      setTopic({
        imagesList,
      }),
    );
  };

  onDelete = e => {
    e.stopPropagation();
    const selectedIds = getSelected(this.props.list).map(item => item.groupId);
    if (!selectedIds.length) {
      message.info('请选择组照！');
      return false;
    }

    const { topicId } = this.props;
    deleteTopicImages({
      groupIds: selectedIds,
      topicId,
    }).then(msg => {
      message.success('删除组照成功！');
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.fetchTopicImages();
      }, 300);
    });
  };

  render() {
    const { errorMessage, isFetching, list } = this.props;
    const { query } = this.state;

    const List = withList(Item);

    return (
      <div className={s.root}>
        <div className={s.bar}>
          <ButtonGroup className={s.selects}>
            {selectBtns.map((btn, index) => (
              <Button
                onClick={e => this.handleSelectClick(e, index)}
                key={`btn${index}`}
              >
                {btn}
              </Button>
            ))}
          </ButtonGroup>
          <span className={gs.btns}>
            <Button onClick={this.onDelete}>批量删除</Button>
          </span>
        </div>
        <List
          onClick={this.handleClick}
          isLoading={isFetching}
          error={errorMessage}
          items={list}
          className={s.list + ' ant-row'}
        />
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

export default withStyles(s, gs)(connect(mapStateToProps)(ThumbList));
