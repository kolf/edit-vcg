import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Form, DatePicker, Button, Modal, Input, Select, Radio } from 'antd';
import { getOptions } from 'data/optionsMaps';
import { createTopic } from 'actions/topic';

import s from './TopicModal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

const categoryOptions = getOptions('categotys');
const timelinesOptions = getOptions('timelines');

class TopicModal extends React.Component {
  static propsTypes = {
    isFetching: PropTypes.bool,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let creds = Object.assign({}, values);
        creds.publishTime = values.publishTime
          ? new Date(values.publishTime).getTime()
          : Date.now();

        this.props.dispatch(createTopic(creds));
      }
    });
  };

  render() {
    const { visible, onClose } = this.props;
    const { getFieldDecorator } = this.props.form;

    const props = {
      width: 800,
      title: '创建专题',
      visible,
      okText: '提交',
      cancelText: '取消',
      onCancel: onClose,
      footer: null,
    };

    return (
      <Modal {...props} className={s.root}>
        <Form>
          <FormItem {...formItemLayout} label="专题名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入专题名称',
                },
              ],
            })(<Input placeholder="请输入专题名称，最多可输入40个字符" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="发布频道">
            {getFieldDecorator('channelId', {
              rules: [
                {
                  required: true,
                  message: '请选择发布频道',
                },
              ],
            })(
              <Select showSearch placeholder="请选择发布频道">
                {categoryOptions.map(option => (
                  <Option value={option.value}>{option.label}</Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="发布时间"
            help="不选择即提交后立即发布"
          >
            {getFieldDecorator('publishTime', {})(
              <DatePicker placeholder="请选择发布时间" />,
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="时效/资料">
            {getFieldDecorator('timeliness', {
              initial: '1',
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
            })(<RadioGroup options={timelinesOptions} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <div className="btns">
              <Button
                type="primary"
                loading={this.props.isFetching}
                onClick={this.handleSubmit}
              >
                提交
              </Button>
            </div>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topic.isFetching,
    message: state.topic.message,
  };
}

export default connect(mapStateToProps)(
  Form.create()(withStyles(s)(TopicModal)),
);
