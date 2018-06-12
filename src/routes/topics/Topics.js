/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Table, Button, Row, Col, Modal, Select, message } from 'antd';
import FilterForm from 'components/FilterForm';
import FilterPager from 'components/FilterPager';
import filterData from 'components/FilterForm/filterData';
import DropdownSelect from 'components/DropdownSelect';
import { getOptionName } from 'data/optionsMaps';
import TopicRuleModal from './components/TopicRuleModal';
import TopicModal from './components/TopicModal';
import SearchInput from 'components/SearchInput';

import gs from 'components/App.less';
import s from './Topics.less';
import { fetchTopics } from 'actions/topics';
import { offlineTopic } from 'actions/topic';
import { fetchCategory } from 'actions/category';

const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
const formItems = filterData.list('1', '2', '3', '4', '5', '6');
// 2018-05-03 00:00:00,2018-06-05 23:59:59
const formatData = dataArr =>
  dataArr.length === 2
    ? `${dataArr[0].format('YYYY-MM-DD')} 00:00:00,${dataArr[1].format(
        'YYYY-MM-DD',
      )} 23:59:59`
    : '';
const timeOptions = [
  {
    value: '1',
    label: '创建时间从新到旧',
  },
  {
    value: '2',
    label: '创建时间从旧到新',
  },
];

class Topics extends React.Component {
  static propTypes = {};

  static defaultProps = {
    list: [],
    total: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      topicRuleModalVisible: false,
      topicModalVisible: false,
      query: {
        pageNum: 1,
        pageSize: 60,
        desc: '1',
        keywordType: '1',
        title: '',
      },
    };
  }

  componentDidMount() {
    this.fetchTopics();
    this.props.dispatch(fetchCategory());
  }

  addTopic = item => {
    this.topicId = '';
    this.setState({ topicModalVisible: true });
  };

  reload = time => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.fetchTopics({ pageNum: 1 });
    }, time || 0);
  };

  fetchTopics = param => {
    const { dispatch } = this.props;
    const { query } = this.state;

    Object.assign(query, param);

    let params = Object.assign({}, query);

    if (query.createdTime && Array.isArray(query.createdTime)) {
      params.createdTime = formatData(query.createdTime);
    }

    if (query.publishTime && Array.isArray(query.publishTime)) {
      params.publishTime = formatData(query.publishTime);
    }

    if (query.updatedBy && Array.isArray(query.updatedBy)) {
      params.updatedBy = query.updatedBy.map(v => v.key).join(',');
    }

    dispatch(fetchTopics(params));
  };

  handleUpdateClick = topicId => {
    window.open(`/topic/update/${topicId}`);
  };

  handleTopicRuleClick = topicId => {
    this.topicId = topicId;
    this.setState({ topicRuleModalVisible: true });
  };

  onOkTopicRuleModal = () => {
    this.state.topicRuleModalVisible = false;
    this.reload(900);
  };

  onCancelTopicRuleModal = () => {
    this.setState({
      topicRuleModalVisible: false,
    });
  };

  onCancelTopicModal = () => {
    this.setState({ topicModalVisible: false });
  };

  onOkTopicModal = () => {
    this.state.topicModalVisible = false;
    this.reload(900);
  };

  handleOfflineClick = topicId => {
    const onOk = () => {
      this.props.dispatch(offlineTopic({ id: topicId })).then(msg => {
        message.success(msg);
        this.reload();
      });
    };

    confirm({
      title: '确定下线该专题？',
      content: '请确认是否下线该专题，下线后前台页面、搜索不再展示该专题',
      okText: '确定',
      cancelText: '取消',
      onOk,
    });
  };

  handleTitleClick = topicId => {
    this.topicId = topicId;
    this.setState({ topicModalVisible: true });
  };

  handleOpenTopicClick = topicId => {
    window.open(`//dev-edit.vcg.com/zh/edit/all?topicIds=${topicId}`);
  };

  handleFilterClick = ({ field, value }) => {
    this.fetchTopics({
      pageNum: 1,
      [field]: value,
    });
  };

  handleSearchInputChange = val => {
    let { query } = this.state;
    query.title = val;
    this.setState({ query });
  };

  render() {
    const { topicRuleModalVisible, topicModalVisible, query } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 42,
      },
      {
        title: '专题ID',
        dataIndex: 'topicId',
        width: 76,
      },
      {
        title: '专题名称',
        dataIndex: 'title',
        render: (text, record) => (
          <a onClick={() => this.handleTitleClick(record.topicId)}>{text}</a>
        ),
        // width: 200,
      },
      {
        title: '频道',
        dataIndex: 'channelId',
        width: 70,
        render: (text, record) => getOptionName('categorys', text + ''),
      },
      {
        title: '创建时间/发布时间',
        dataIndex: 'time1',
        width: 136,
        render: (text, record) => {
          const { createDate, publishDate } = record;
          return [createDate, publishDate].map(name => (
            <p className={gs.gap0}>{name}</p>
          ));
        },
      },
      {
        title: '专题状态',
        dataIndex: 'status',
        width: 70,
        render: (text, record) => getOptionName('topicState', text + ''),
      },
      {
        title: '编审人',
        dataIndex: 'updatedBy',
        width: 70,
        render: text => text || '---',
      },
      {
        title: '抓取状态',
        dataIndex: 'runningStatus',
        width: 70,
        render: (text, record) => getOptionName('runningStatus', text + ''),
      },
      {
        title: '抓取时间',
        dataIndex: 'time2',
        width: 136,
        render: (text, record) => {
          const { uploadBeginTime, uploadEndTime } = record;
          return [
            <p className={gs.gap0}>{uploadBeginTime || '---'}</p>,
            <p className={gs.gap0}>{uploadEndTime || '---'}</p>,
          ];
        },
      },
      {
        title: '操作',
        dataIndex: 'btns',
        width: 274,
        render: (text, record) => (
          <div className={s.settingBtns}>
            <Button
              size="small"
              onClick={() => this.handleUpdateClick(record.topicId)}
            >
              网站设置
            </Button>
            <Button
              size="small"
              onClick={() => this.handleTopicRuleClick(record.topicId)}
            >
              抓取设置
            </Button>
            <Button
              size="small"
              onClick={() => this.handleOfflineClick(record.topicId)}
            >
              下线
            </Button>
            <Button
              size="small"
              onClick={() => this.handleOpenTopicClick(record.topicId)}
            >
              查看组照
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div className={s.root}>
        <TopicModal
          id={this.topicId}
          onCancel={this.onCancelTopicModal}
          onOk={this.onOkTopicModal}
          visible={topicModalVisible}
        />
        <TopicRuleModal
          id={this.topicId}
          visible={topicRuleModalVisible}
          onOk={this.onOkTopicRuleModal}
          onCancel={this.onCancelTopicRuleModal}
        />
        <SearchInput
          types={[
            { value: '1', label: '专题ID' },
            { value: '2', label: '专题名称' },
          ]}
          typeValue={query.keywordType}
          value={query.title}
          placeholder="输入专题名称或ID进行搜索"
          onChange={this.handleSearchInputChange}
          onClick={values =>
            this.fetchTopics({
              title: values.value,
              keywordType: values.typeValue,
            })
          }
        />

        <FilterForm
          pageId="202"
          value={query}
          formItems={formItems}
          onClick={this.handleFilterClick}
        />
        <Row>
          <Col span="16">
            <div className={s.btns}>
              <Button type="primary" onClick={this.addTopic}>
                创建专题
              </Button>
              <Button onClick={() => this.fetchTopics({ pageNum: 1 })}>
                刷新
              </Button>
              <DropdownSelect
                value={query.desc}
                options={timeOptions}
                onChange={desc => this.fetchTopics({ desc })}
              />
            </div>
          </Col>
          <Col span="8">
            <FilterPager
              pageSize={query.pageSize}
              pageNum={query.pageNum}
              className={gs.fRight}
              onChange={this.fetchTopics}
              total={this.props.total}
            />
          </Col>
        </Row>

        <Table
          pagination={false}
          className={gs.table}
          bordered
          size="small"
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={this.props.list}
          onChange={this.fetchTopics}
          loading={this.props.isFetching}
        />
        <div className="ant-row">
          <FilterPager
            pageSize={query.pageSize}
            pageNum={query.pageNum}
            className={gs.fRight}
            onChange={this.fetchTopics}
            total={this.props.total}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topics.isFetching,
    list: state.topics.list,
    total: state.topics.total,
  };
}

export default connect(mapStateToProps)(withStyles(s, gs)(Topics));
