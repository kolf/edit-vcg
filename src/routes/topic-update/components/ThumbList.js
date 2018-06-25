import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Radio, Tabs, Pagination, Button, Icon, Spin } from 'antd';
import FilterPager from 'components/FilterPager';
import gs from 'components/App.less';
import s from './ThumbList.less';

import { fetchTopicImages, setTopic } from 'actions/topic';

const RadioGroup = Radio.Group;
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

const selectBtns = ['全选', '反选', '取消'];
const defaultThumb = require('../assets/logo-white.svg');

function Item({ onClick, oss176, id, title, selected }) {
  const handleClick = e => {
    e.stopPropagation();
    onClick && onClick(id, selected);
  };

  return (
    <div
      className={s.item + (selected ? ' ' + s.active : '')}
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
  };

  state = {
    query: {
      topicIds: this.props.topicId,
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
      } else {
        return item;
      }
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
    const { row } = this.props;
    const { query } = this.state;

    const spanSize = row;

    return (
      <div className={s.root}>
        <div className={s.bar}>
          <RadioGroup
            defaultValue={1}
            onChange={this.handleChangeAsset}
            options={assetOptions}
          />
          <ButtonGroup className={s.selects}>
            {selectBtns.map((btn, index) => (
              <Button
                onClick={e => this.handleSelectClick(e, index)}
                key={'btn' + index}
              >
                {btn}
              </Button>
            ))}
          </ButtonGroup>
          <span className={gs.btns}>
            <Button>批量删除</Button>
            <Button>批量上线</Button>
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
          <Row className={s.list}>
            {this.props.list.map((img, index) => (
              <Col key={img.id} span={spanSize}>
                <Item {...img} onClick={this.handleItemClick} />
              </Col>
            ))}
          </Row>
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
    isFetching: state.topic.isFetching,
    list: state.topic.imagesList,
    total: state.topic.imagesTotal,
  };
}

export default withStyles(s, gs)(connect(mapStateToProps)(ThumbList));
