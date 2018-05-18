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
import { Input, Table, Button, Row, Col, Modal, Select } from 'antd';
import FilterForm from 'components/FilterForm';
import FilterPager from 'components/FilterPager';
import filterData from 'components/FilterForm/filterData';
import DropdownSelect from 'components/DropdownSelect';
import { getOptionName } from 'data/optionsMaps';
import TopicSettingModal from './components/TopicSettingModal';
import TopicModal from './components/TopicModal';

import gs from 'components/App.less';
import s from './Topics.less';
import { fetchTopics } from 'actions/topics';

const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
const formItems = filterData.list('1', '2', '3', '4', '5', '6');

const timeOptions = [
  {
    value: 1,
    label: '创建时间从新到旧',
  },
  {
    value: 2,
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
      topicSettingVisible: false,
      topicModalVisible: false,
      query: {
        pageNum: 1,
        pageSize: 60,
        desc: 1,
      },
    };
  }

  componentDidMount() {
    this.fetchTopics();
  }

  addTopic = item => {
    this.setState({ topicModalVisible: true });
  };

  reload = () => {
    this.fetchTopics({ pageNum: 1 });
  };

  fetchTopics = param => {
    const { dispatch } = this.props;
    const { query } = this.state;
    if (param) {
      Object.assign(query, param);
    }

    dispatch(fetchTopics(query));
  };

  handleClickView = e => {
    window.open('/topic/update/1');
  };

  handlerClickTopicSetting = topicId => {
    this.topicId = topicId;
    this.setState({ topicSettingVisible: true });
  };

  closeAutoRuleModal = () => {
    this.setState({ topicSettingVisible: false });
  };

  closeTopicModal = () => {
    this.setState({ topicModalVisible: false });
  };

  handlerClickOffline = item => {
    confirm({
      title: '确定下线该专题？',
      content: '请确认是否下线该专题，下线后前台页面、搜索不再展示该专题',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
    });
  };

  handlerClickOpenGroup = item => {
    window.open(
      'https://edit.vcg.com/zh/group/update/edit/503808611?groupId=503808611',
    );
  };

  render() {
    const { topicSettingVisible, topicModalVisible, query } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 46,
      },
      {
        title: '专题ID',
        dataIndex: 'topicId',
        width: 76,
      },
      {
        title: '专题名称',
        dataIndex: 'title',
        // width: 200,
      },
      {
        title: '频道',
        dataIndex: 'channelId',
        width: 70,
        render: (text, record) => getOptionName('categotys', text + ''),
      },
      {
        title: '创建时间/发布时间',
        dataIndex: 'time1',
        width: 130,
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
        width: 130,
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
            <Button size="small" onClick={this.handleClickView}>
              网站设置
            </Button>
            <Button
              size="small"
              onClick={() => this.handlerClickTopicSetting(record.topicId)}
            >
              抓取设置
            </Button>
            <Button size="small" onClick={this.handlerClickOffline}>
              下线
            </Button>
            <Button size="small" onClick={this.handlerClickOpenGroup}>
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
          onClose={this.closeTopicModal}
          visible={topicModalVisible}
        />
        <TopicSettingModal
          id={this.topicId}
          visible={topicSettingVisible}
          onClose={this.closeAutoRuleModal}
        />
        <div
          style={{
            padding: '24px 0',
          }}
        >
          <Search
            className={s.search}
            placeholder="输入专题名称或ID进行搜索"
            onSearch={value => console.log(value)}
            size="large"
            enterButton="搜索"
          />
        </div>
        <FilterForm saveBtn formItems={formItems} />
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
