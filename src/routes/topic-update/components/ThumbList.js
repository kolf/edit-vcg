import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Button, Spin } from 'antd';
import FilterPager from 'components/FilterPager';
import FetchPlaceholder from 'components/FetchPlaceholder';
import gs from 'components/App.less';
import s from './ThumbList.less';

import { fetchTopicImages, setTopic } from 'actions/topic';

const ButtonGroup = Button.Group;

const selectBtns = ['全选', '反选', '取消'];
const defaultThumb = require('../assets/logo-white.svg');

function Item({ onClick, oss176, id, title, selected }) {
  const handleClick = e => {
    e.stopPropagation();
    onClick && onClick(id, selected);
  };

  return (
    <div
      className={s.item + (selected ? ` ${s.active}` : '')}
      onClick={handleClick}
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
  );
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

  handleItemClick = (id, active) => {
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

  render() {
    const { errorMessage } = this.props;
    const { query } = this.state;

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
            <Button>批量删除</Button>
          </span>
          <FilterPager
            isRight
            pageSize={query.pageSize}
            pageNum={query.pageNum}
            className={gs.fRight}
            onChange={this.fetchTopicImages}
            total={this.props.total}
          />
        </div>
        <Spin
          wrapperClassName={s.list}
          spinning={this.props.isFetching}
          tip="加载中..."
        >
          {errorMessage ? (
            <FetchPlaceholder text={errorMessage} />
          ) : (
            <Row className={s.list}>
              {this.props.list.map(img => (
                <Col key={img.id} span={4}>
                  <Item {...img} onClick={this.handleItemClick} />
                </Col>
              ))}
            </Row>
          )}
        </Spin>
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

export default withStyles(s, gs)(connect(mapStateToProps)(ThumbList));
