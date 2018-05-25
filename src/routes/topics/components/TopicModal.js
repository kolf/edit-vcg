import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import {
  Form,
  DatePicker,
  Button,
  Modal,
  Input,
  Select,
  Radio,
  message
} from 'antd'
import moment from 'moment'

import { getOptions } from 'data/optionsMaps'
import { createTopic } from 'actions/topic'

import s from './TopicModal.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

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

const categoryOptions = getOptions('categorys')
const timelinesOptions = getOptions('timelines')
// const getMilliseconds =
class TopicModal extends React.Component {
  static propsTypes = {
    isFetching: PropTypes.bool
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.visible === true &&
      this.props.visible === false &&
      nextProps.id
    ) {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.setFieldsValue()
      }, 300)
    }
  }

  setFieldsValue = id => {
    const {
      form,
      topic: { title, channelId, publishDate, timeliness }
    } = this.props

    form.setFieldsValue({
      title,
      channelId: channelId + '',
      publishTime: moment(publishDate),
      timeliness: timeliness + ''
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let creds = Object.assign({}, values)

        if (this.props.id) {
          creds.topicId = this.props.id
        }

        creds.publishTime = values.publishTime
          ? new Date(values.publishTime).getTime()
          : Date.now()

        this.props.dispatch(createTopic(creds)).then(data => {
          message.success(data.message)
          this.props.onOk()
        })
      }
    })
  }

  render () {
    const { visible, onCancel, onOk, id } = this.props
    const { getFieldDecorator } = this.props.form

    const props = {
      width: 800,
      title: id ? '修改专题' : '创建专题',
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
        <Form>
          <FormItem {...formItemLayout} label='专题名称'>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入专题名称'
                }
              ]
            })(<Input placeholder='请输入专题名称，最多可输入40个字符' />)}
          </FormItem>

          <FormItem {...formItemLayout} label='发布频道'>
            {getFieldDecorator('channelId', {
              rules: [
                {
                  required: true,
                  message: '请选择发布频道'
                }
              ],
              onChange (v) {
                console.log(v)
              }
            })(
              <Select showSearch placeholder='请选择发布频道'>
                {categoryOptions.map(option => (
                  <Option key={option.value}>{option.label}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label='发布时间' help='不选择即提交后立即发布'>
            {getFieldDecorator('publishTime', {})(
              <DatePicker placeholder='请选择发布时间' />
            )}
          </FormItem>

          <FormItem {...formItemLayout} label='时效/资料'>
            {getFieldDecorator('timeliness', {
              initial: '1',
              rules: [
                {
                  required: true,
                  message: '请选择'
                }
              ]
            })(<RadioGroup options={timelinesOptions} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <div className='btns'>
              <Button
                type='primary'
                loading={this.props.isFetching}
                onClick={this.handleSubmit}
              >
                提交
              </Button>
            </div>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    topic: state.topics.list.find(item => item.topicId === props.id),
    isFetching: state.topic.isFetching,
    message: state.topic.message
  }
}

export default connect(mapStateToProps)(
  Form.create()(withStyles(s)(TopicModal))
)
