import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import {
  Form,
  DatePicker,
  TimePicker,
  Button,
  Modal,
  Input,
  Select,
  Divider,
  Radio,
  Icon,
  Checkbox,
  Alert,
  Row,
  Col,
  Spin,
  message
} from 'antd'
import KeywordGroup from 'components/KeywordGroup'
import CategorySelect from 'components/CategorySelect'
import { fetchTopicRule, updateTopicRule } from 'actions/topicRule'
import { stopTopic } from 'actions/topic'
import { fetchKeywordDict } from 'actions/keywordDict'
import { getOptionName, getOptions } from 'data/optionsMaps'
import moment from 'moment'
import gs from 'components/App.less'
import s from './TopicRuleModal.less'

const FormItem = Form.Item
const MonthPicker = DatePicker.MonthPicker
const RangePicker = DatePicker.RangePicker
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 6
    }
  }
}

const statusOptions = getOptions('imageStatus')
const rangeOptions = getOptions('ranges')
const assetOptions = getOptions('assets')
const defaultName = '---'

function getTime (date) {
  return new Date(date).getTime()
}

function getKeywordIds (values) {
  return Array.isArray(values) ? values.map(v => v.value).toString() : ''
}

class TopicRuleModal extends React.Component {
  static propsTypes = {}

  static defaultProps = {
    confirmLoading: false,
    isFetching: false,
    topic: {},
    id: ''
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.visible === true &&
      this.props.visible === false &&
      nextProps.id
    ) {
      this.getTopicRule(nextProps.id)
    }
  }

  getTopicRule = id => {
    this.props.dispatch(fetchTopicRule({ id })).then(topicRule => {
      if (!topicRule) {
        return
      }
      let {
        category,
        timeliness,
        resUploadBeginTime,
        resUploadEndTime,
        providerId,
        resStatus,
        resRange,
        isOnline,
        allContainKeywords,
        anyContainKeywords,
        notContainKeywords
      } = topicRule

      this.initKeywordValue(
        allContainKeywords,
        anyContainKeywords,
        notContainKeywords
      )

      this.props.form.setFieldsValue({
        isOnline: isOnline === 1,
        timeliness: timeliness.split(','),
        runTime: [moment(resUploadBeginTime), moment(resUploadEndTime)],
        providerId,
        category: /\d+/.test(category + '') ? category.match(/\d+/g) : [],
        status: resStatus ? resStatus.match(/\d+/g) : [],
        range: resRange ? resRange.match(/\d+/g) : []
      })
    })
  }

  initKeywordValue = (...args) => {
    this.props
      .dispatch(
        fetchKeywordDict({
          data: args.toString()
        })
      )
      .then(keywordMap => {
        let keywords = [
          'allContainKeywords',
          'anyContainKeywords',
          'notContainKeywords'
        ].reduce((result, key, index) => {
          const ids = args[index].match(/\d+/g)
          result[key] = ids ? ids.map(id => keywordMap[id]) : []
          return result
        }, {})

        console.log(keywords)

        this.props.form.setFieldsValue({ keywords })
      })
  }

  handlerSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {
          keywords,
          category,
          status,
          timeliness,
          isOnline,
          runTime,
          providerId,
          range
        } = values
        let {
          allContainKeywords,
          anyContainKeywords,
          notContainKeywords
        } = keywords

        const creds = {
          allContainKeywords: getKeywordIds(allContainKeywords),
          anyContainKeywords: getKeywordIds(anyContainKeywords),
          notContainKeywords: getKeywordIds(notContainKeywords),
          category: Array.isArray(category)
            ? category
                .map(c => (typeof c === 'string' ? c : c.value))
                .toString()
            : category,
          status: status.toString(),
          timeliness: timeliness.toString(),
          isOnline: isOnline ? '1' : '0',
          endTime: getTime(runTime[0]),
          beginTime: getTime(runTime[1]),
          topicId: this.props.id + '',
          providerId,
          range: range.toString()
        }
        this.props.dispatch(updateTopicRule(creds)).then(msg => {
          message.success('专题规则更新成功')
          this.props.onOk()
        })
      }
    })
  }

  handlerClickStop = e => {
    this.props
      .dispatch(
        stopTopic({
          id: this.props.id
        })
      )
      .then(data => {
        message.success(data.message)
      })
  }

  checkKeywords = (rule, value, callback) => {
    if (1) {
      callback()
    } else if (value.length !== 0) {
      callback('请删除不确定关键词')
    } else {
      callback()
    }
  }

  render () {
    const { visible, onCancel, onOk, topic } = this.props
    const { getFieldDecorator, getFieldsValue } = this.props.form

    const props = {
      width: 800,
      title: '修改抓取规则',
      visible,
      okText: '提交',
      cancelText: '取消',
      onCancel,
      onOk,
      footer: null,
      destroyOnClose: true
    }

    return (
      <Modal {...props} className={s.root}>
        <Spin spinning={this.props.isFetching}>
          <Row className={s.info}>
            <Col span='6'>专题ID：{topic.topicId}</Col>
            <Col span='15'>专题名称：{topic.title} </Col>
            <Col span='3'>
              状态：{getOptionName('runningStatus', topic.runningStatus + '')}
            </Col>
            <Col span='10'>
              任务抓取开始时间：{topic.uploadBeginTime || defaultName}
            </Col>
            <Col span='10'>
              任务抓取结束时间: {topic.uploadEndTime || defaultName}
            </Col>
            <Col span='4'>抓取结果：--- </Col>
          </Row>
          <Form>
            <Divider>抓取规则</Divider>
            <FormItem {...formItemLayout} label='抓取入库时间'>
              {getFieldDecorator('runTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择抓取入库时间'
                  }
                ]
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={['起始日期', '结束日期']}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label='抓取分类'>
              {getFieldDecorator('category', {
                initialValue: [],
                rules: [
                  {
                    required: true,
                    message: '请选择抓取分类'
                  }
                ]
              })(<CategorySelect />)}
            </FormItem>
            <FormItem {...formItemLayout} label='抓取供应商'>
              {getFieldDecorator('providerId', {})(
                <Input placeholder='请输入供应商名称' />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label='抓取状态'>
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                    message: '请选择抓取状态'
                  }
                ]
              })(<CheckboxGroup options={statusOptions} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='抓取范围'>
              {getFieldDecorator('range', {
                rules: [
                  {
                    required: true,
                    message: '请选择抓取范围'
                  }
                ]
              })(<CheckboxGroup options={rangeOptions} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='抓取关键词'>
              {getFieldDecorator('keywords', {
                initialValue: {
                  allContainKeywords: [],
                  anyContainKeywords: [],
                  notContainKeywords: []
                },
                rules: [
                  {
                    required: true,
                    message: '请选择填写关键词'
                  },
                  {
                    validator: this.checkKeywords
                  }
                ]
              })(<KeywordGroup />)}
            </FormItem>

            <FormItem {...formItemLayout} label='抓取时效/资料'>
              {getFieldDecorator('timeliness', {
                rules: [
                  {
                    required: true,
                    message: '请选择类型'
                  }
                ]
              })(<CheckboxGroup options={assetOptions} />)}
            </FormItem>
            <Divider className={s.divider} />
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('isOnline', {
                valuePropName: 'checked'
              })(<Checkbox>抓取完成后将未上线的图片做上线操作</Checkbox>)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <div className={gs.btns}>
                <Button
                  type='primary'
                  className='mr-5'
                  onClick={this.handlerSubmit}
                  loading={this.props.confirmLoading}
                >
                  提交
                </Button>
                <Button
                  loading={this.props.stopTopicFetching}
                  onClick={this.handlerClickStop}
                >
                  结束抓取
                </Button>
              </div>
              <Alert
                message='注：修改抓取规则提交后，之前进行中的任务结束，按新规则重新进行抓取，之前抓取的组照还在该专题下。如果抓取任务正在进行，可点击结束抓取来终止自动抓取行为'
                type='warning'
                showIcon
              />
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    isFetching: state.topicRule.isFetching,
    confirmLoading: state.topicRule.confirmLoading,
    topic: state.topics.list.find(item => item.topicId === props.id),
    stopTopicFetching: state.topic.isFetching
  }
}

export default connect(mapStateToProps)(
  Form.create()(withStyles(gs, s)(TopicRuleModal))
)
