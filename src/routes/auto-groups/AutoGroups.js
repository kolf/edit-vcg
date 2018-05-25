import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { Input, Table, Button, Row, Col, Modal, Select } from 'antd'
import FilterForm from 'components/FilterForm'
import FilterPager from 'components/FilterPager'
import filterData from 'components/FilterForm/filterData'
import DropdownSelect from 'components/DropdownSelect'
import { getOptionName } from 'data/optionsMaps'
import AutoGroupRuleModal from './components/AutoGroupRuleModal'
import AutoGroupModal from './components/AutoGroupModal'
import SearchInput from 'components/SearchInput'

import gs from 'components/App.less'
import s from './AutoGroups.less'
import { fetchAutoGroups } from 'actions/autoGroups'
import { fetchCategory } from 'actions/category'
import { fetchKeywordDict } from 'actions/keywordDict'

const confirm = Modal.confirm
const Option = Select.Option
const formItems = filterData.list('1', '3', '5', '6')

const timeOptions = [
  {
    value: '1',
    label: '创建时间从新到旧'
  },
  {
    value: '2',
    label: '创建时间从旧到新'
  }
]

const defaultText = '---'

function getKeywordNames (ids, keywordDict) {
  return ids
    .match(/\d+/g)
    .map(id => (keywordDict[id] ? keywordDict[id].label : ''))
    .join(', ')
}

class AutoGroups extends React.Component {
  static propTypes = {}

  static defaultProps = {
    list: [],
    total: 0,
    isFetching: false
  }

  constructor (props) {
    super(props)
    this.state = {
      autoGroupRuleVisible: false,
      autoGroupModalVisible: false,
      query: {
        pageNum: 1,
        pageSize: 60,
        desc: '1',
        keywordType: '1',
        title: ''
      }
    }
  }

  componentDidMount () {
    this.fetchAutoGroups()
    this.props.dispatch(fetchCategory())
  }

  addAutoGroup = item => {
    this.setState({ autoGroupModalVisible: true })
  }

  reload = time => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      this.fetchAutoGroups({ pageNum: 1 })
    }, time || 0)
  }

  fetchAutoGroups = param => {
    const { dispatch } = this.props
    const { query } = this.state

    let params = Object.assign(query, param)

    if (query.createdTime && Array.isArray(query.createdTime)) {
      params.createdTime = formatData(query.createdTime)
    }

    dispatch(fetchAutoGroups(params)).then(() => {
      let ids = this.props.list.reduce((result, item) => {
        let {
          allContainKeywords,
          anyContainKeywords,
          notContainKeywords
        } = item
        return result.concat([
          allContainKeywords,
          anyContainKeywords,
          notContainKeywords
        ])
      }, [])

      dispatch(
        fetchKeywordDict({
          data: _.uniq(ids).toString()
        })
      )
    })
  }

  handleClickView = e => {
    window.open('/topic/update/1')
  }

  handleClickGroupRule = groupId => {
    this.groupId = groupId
    this.setState({ autoGroupRuleVisible: true })
  }

  onOkAutoGroupRuleModal = () => {
    this.state.autoGroupRuleVisible = false
    this.reload(900)
  }

  onCancelAutoGroupRuleModal = () => {
    this.setState({
      autoGroupRuleVisible: false
    })
  }

  onCancelAutoGroupModal = () => {
    this.setState({ autoGroupModalVisible: false })
  }

  onOkAutoGroupModal = () => {
    this.state.autoGroupModalVisible = false
    this.reload(900)
  }

  handleClickOffline = item => {
    confirm({
      title: '确定下线该专题？',
      content: '请确认是否下线该专题，下线后前台页面、搜索不再展示该专题',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        console.log('OK')
      }
    })
  }

  handleClickOpenGroup = item => {
    window.open(
      'https://edit.vcg.com/zh/group/update/edit/503808611?groupId=503808611'
    )
  }

  handleClickFilter = ({ field, value }) => {
    this.fetchAutoGroups({
      pageNum: 1,
      [field]: value
    })
  }

  handleSearchInputChange = val => {
    let { query } = this.state
    query.title = val
    this.setState({ query })
  }

  render () {
    const { keywordDict } = this.props
    let { autoGroupRuleVisible, autoGroupModalVisible, query } = this.state

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 46
      },
      {
        title: '组照ID',
        dataIndex: 'groupId',
        width: 76
      },
      {
        title: '组照标题',
        dataIndex: 'title'
        // width: 140
      },
      {
        title: '所属专题',
        dataIndex: 'topicId',
        width: 100,
        render: text => text || defaultText
      },
      {
        title: '开始时间/结束时间',
        dataIndex: 'time1',
        width: 130,
        render: (text, record) => {
          const { beginTime, endTime } = record
          return [beginTime, endTime].map(value => (
            <p className={gs.gap0}>{value || '---'}</p>
          ))
        }
      },
      {
        title: '抓取分类',
        dataIndex: 'category',
        width: 100,
        render: text =>
          (text && this.props.categoryDict
            ? text
                .match(/\d+/g)
                .map(value => this.props.categoryDict[value].label)
                .join(', ')
            : '---')
      },
      {
        title: '抓取关键词',
        dataIndex: 'keywords',
        width: 160,
        render: (text, record) => {
          let {
            allContainKeywords,
            anyContainKeywords,
            notContainKeywords
          } = record
          let result = []
          if (allContainKeywords) {
            result.push(
              <p className={gs.gap0}>
                <strong className={gs.gapRight4}>包含全部:</strong>
                {getKeywordNames(allContainKeywords, keywordDict)}
              </p>
            )
          }
          if (anyContainKeywords) {
            result.push(
              <p className={gs.gap0}>
                <strong className={gs.gapRight4}>包含任意一个:</strong>
                {getKeywordNames(anyContainKeywords, keywordDict)}
              </p>
            )
          }
          if (notContainKeywords) {
            result.push(
              <p className={gs.gap0}>
                <strong className={gs.gapRight4}>不包含:</strong>
                {getKeywordNames(notContainKeywords, keywordDict)}
              </p>
            )
          }
          return result.length > 0 ? result : defaultText
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        width: 130
      },
      {
        title: '数量',
        dataIndex: 'createdTime1',
        width: 60,
        render: text => text || defaultText
      },
      {
        title: '抓取状态',
        dataIndex: 'runningStatus',
        width: 80,
        render: text => getOptionName('runningStatus', text)
      },
      {
        title: '操作',
        dataIndex: 'btns',
        width: 240,
        render: (text, record) => (
          <div className={s.btns}>
            <Button
              size='small'
              onClick={() => this.handleClickGroupRule(record.groupId)}
            >
              抓取设置
            </Button>
            <Button size='small' onClick={this.handleClickOpenGroup}>
              查看组照
            </Button>
          </div>
        )
      }
    ]

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

        <SearchInput
          types={[{ value: '1', label: '组标题' }, { value: '2', label: '组ID' }]}
          typeValue={query.keywordType}
          value={query.title}
          placeholder='输入组标题或ID进行搜索'
          onChange={this.handleSearchInputChange}
          onClick={values =>
            this.fetchAutoGroups({
              title: values.value,
              keywordType: values.typeValue
            })}
        />

        <FilterForm onClick={this.handleClickFilter} formItems={formItems} />
        <Row>
          <Col span='16'>
            <div className={s.btns}>
              <Button type='primary' onClick={this.addAutoGroup}>
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
          <Col span='8'>
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
          size='small'
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={this.props.list}
          onChange={this.fetchAutoGroups}
          loading={this.props.isFetching}
        />
        <div className='ant-row'>
          <FilterPager
            pageSize={query.pageSize}
            pageNum={query.pageNum}
            className={gs.fRight}
            onChange={this.fetchAutoGroups}
            total={this.props.total}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.autoGroups.isFetching,
    list: state.autoGroups.list,
    total: state.autoGroups.total,
    categoryDict: state.category.mapData,
    keywordDict: state.keywordDict.mapData
  }
}

export default connect(mapStateToProps)(withStyles(s, gs)(AutoGroups))
