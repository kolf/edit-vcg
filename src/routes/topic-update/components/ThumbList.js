import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Radio, Tabs, Pagination, Button, Icon, Spin } from 'antd';
import FilterPager from 'components/FilterPager';
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
    <div className={s.item} onClick={() => onClick(id, selected)}>
      <div className={s.picture}>
        <img src={oss176} alt="" />
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
      topicId: '100804',
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

  handlerClickItem = (id, selected) => {};

  fetchTopicImages = param => {
    const { dispatch } = this.props;
    const { query } = this.state;
    if (param) {
      Object.assign(query, param);
    }

    dispatch(fetchTopicImages(query));
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
            <Button>全选</Button>
            <Button>取消</Button>
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
          <Row>
            {this.props.list.map((img, index) => (
              <Col key={img.id} span={spanSize}>
                <Item {...img} onClick={this.handlerClickItem} />
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

export default connect(mapStateToProps)(withStyles(s, gs)(ThumbList));
