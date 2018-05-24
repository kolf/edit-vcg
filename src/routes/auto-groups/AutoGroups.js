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
import AutoGroupRuleModal from './components/AutoGroupRuleModal';
import AutoGroupModal from './components/AutoGroupModal';

import gs from 'components/App.less';
import s from './AutoGroups.less';
import { fetchAutoGroups } from 'actions/autoGroups';
import { fetchCategory } from 'actions/category';

const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
const formItems = filterData.list('1', '3', '5', '6');

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

class AutoGroups extends React.Component {
  static propTypes = {};

  static defaultProps = {
    list: [],
    total: 0,
    isFetching: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      autoGroupRuleVisible: false,
      autoGroupModalVisible: false,
      query: {
        pageNum: 1,
        pageSize: 60,
        desc: '1',
      },
    };
  }

  componentDidMount() {
    this.fetchAutoGroups();
    this.props.dispatch(fetchCategory());
  }

  addAutoGroup = item => {
    this.setState({ autoGroupModalVisible: true });
  };

  reload = () => {
    this.fetchAutoGroups({ pageNum: 1 });
  };

  fetchAutoGroups = param => {
    const { dispatch } = this.props;
    const { query } = this.state;
    if (param) {
      Object.assign(query, param);
    }

    dispatch(fetchAutoGroups(query));
  };

  handleClickView = e => {
    window.open('/topic/update/1');
  };

  handleClickGroupRule = groupId => {
    this.groupId = groupId;
    this.setState({ autoGroupRuleVisible: true });
  };

  onOkAutoGroupRuleModal = () => {
    this.state.autoGroupRuleVisible = false;
    this.reload();
  };

  onCancelAutoGroupRuleModal = () => {
    this.setState({
      autoGroupRuleVisible: false,
    });
  };

  onCancelAutoGroupModal = () => {
    this.setState({ autoGroupModalVisible: false });
  };

  onOkAutoGroupModal = () => {
    this.state.autoGroupModalVisible = false;
    this.reload();
  };

  handleClickOffline = item => {
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

  handleClickOpenGroup = item => {
    window.open(
      'https://edit.vcg.com/zh/group/update/edit/503808611?groupId=503808611',
    );
  };

  handleClickFilter = ({ field, value }) => {
    this.fetchAutoGroups({
      pageNum: 1,
      [field]: value
    })
  }

  render() {
    const { autoGroupRuleVisible, autoGroupModalVisible, query } = this.state;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 50,
      },
      {
        title: '组照ID',
        dataIndex: 'groupId',
        width: 80,
      },
      {
        title: '组照标题',
        dataIndex: 'title',
        // width: 140
      },
      {
        title: '所属专题',
        dataIndex: 'topicId',
        width: 100,
      },
      {
        title: '开始时间/结束时间',
        dataIndex: 'createdTime',
        width: 140,
      },
      {
        title: '抓取分类',
        dataIndex: 'category',
        width: 100,
        render: (text) => (text && this.props.categoryDict) ? text.match(/\d+/g).map(value => this.props.categoryDict[value].label).join(', ') : '---'
      },
      {
        title: '抓取关键词',
        dataIndex: 'keywords',
        width: 80,
      },
      {
        title: '创建时间',
        dataIndex: 'updatedTime',
        width: 150,
      },
      {
        title: '数量',
        dataIndex: 'createdTime1',
        width: 60,
      },
      {
        title: '抓取状态',
        dataIndex: 'runningStatus',
        width: 80
      },
      {
        title: '操作',
        dataIndex: 'btns',
        width: 240,
        render: (text, record) => (
          <div className={s.btns}>
            <Button
              size="small"
              onClick={() => this.handleClickGroupRule(record.groupId)}
            >
              抓取设置
            </Button>
            <Button size="small" onClick={this.handleClickOpenGroup}>
              查看组照
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div className={s.root}>
        <AutoGroupModal
          visible={autoGroupModalVisible}
          onCancel={this.onCancelAutoGroupModal}
          onOk={this.onOkAutoGroupModal}
        />
        <AutoGroupRuleModal
          groupId={this.groupId}
          visible={autoGroupRuleVisible}
          onOk={this.onOkAutoGroupRuleModal}
          onCancel={this.onCancelAutoGroupRuleModal}
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
        <FilterForm onClick={this.handleClickFilter} formItems={formItems} />
        <Row>
          <Col span="16">
            <div className={s.btns}>
              <Button type="primary" onClick={this.addAutoGroup}>
                创建组照
              </Button>
              <Button onClick={() => this.fetchAutoGroups({ pageNum: 1 })}>
                刷新
              </Button>
              <DropdownSelect
                value={query.desc}
                options={timeOptions}
                onChange={desc => this.fetchAutoGroups({ desc })}
              />
            </div>
          </Col>
          <Col span="8">
            <FilterPager
              pageSize={query.pageSize}
              pageNum={query.pageNum}
              className={gs.fRight}
              onChange={this.fetchAutoGroups}
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
          onChange={this.fetchAutoGroups}
          loading={this.props.isFetching}
        />
        <div className="ant-row">
          <FilterPager
            pageSize={query.pageSize}
            pageNum={query.pageNum}
            className={gs.fRight}
            onChange={this.fetchAutoGroups}
            total={this.props.total}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.autoGroups.isFetching,
    list: state.autoGroups.list,
    total: state.autoGroups.total,
    categoryDict: state.category.mapData,
  };
}

export default connect(mapStateToProps)(withStyles(s, gs)(AutoGroups));
