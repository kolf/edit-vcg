import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Form,
  DatePicker,
  Button,
  Modal,
  Input,
  Select,
  Radio,
  message,
  InputNumber,
  Checkbox,
} from 'antd';
import moment from 'moment';

import { getOptions } from 'data/optionsMaps';
import { createTopic } from 'actions/topic';
import KeywordTag from 'components/KeywordTag';

import s from './GroupTagsModal.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

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

const rangeOptions = [
  {
    value: '1',
    label: '图关键词',
  },
  {
    value: '2',
    label: '组关键词',
  },
];

function checkKeywords(rule, value, callback) {
  if (!Object.values(value).every(vs => vs.every(v => /^\d+$/.test(v.value)))) {
    callback('请删除不确定关键词');
  }
  callback();
}

class GroupTagsModal extends React.Component {
  static propsTypes = {
    isFetching: PropTypes.bool,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visible === true &&
      this.props.visible === false &&
      nextProps.id
    ) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.setFieldsValue();
      }, 300);
    }
  }

  setFieldsValue = id => {
    const {
      form,
      topic: { title, channelId, publishDate, timeliness },
    } = this.props;

    form.setFieldsValue({
      title,
      channelId: channelId + '',
      publishTime: moment(publishDate),
      timeliness: timeliness + '',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let creds = Object.assign({}, values);

        if (this.props.id) {
          creds.topicId = this.props.id;
        }

        creds.publishTime = values.publishTime
          ? new Date(values.publishTime).getTime()
          : Date.now();

        this.props.dispatch(createTopic(creds)).then(msg => {
          message.success(msg);
          this.props.onOk();
        });
      }
    });
  };

  render() {
    const { visible, onCancel, onOk, id } = this.props;
    const { getFieldDecorator } = this.props.form;

    const props = {
      width: 800,
      title: id ? '修改筛选项' : '创建筛选项',
      visible,
      okText: '提交',
      cancelText: '取消',
      onCancel,
      onOk,
      footer: null,
      destroyOnClose: true,
    };

    return (
      <Modal {...props} className={s.root}>
        <Form>
          <FormItem {...formItemLayout} label="筛选项名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入筛选项名称',
                },
              ],
            })(<Input placeholder="请输入筛选项名称，最多可输入40个字符" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="关键词">
            {getFieldDecorator('keywords', {
              initialValue: [],
            })(<KeywordTag />)}
          </FormItem>

          <FormItem {...formItemLayout} label="搜索范围">
            {getFieldDecorator('range', {
              initial: '1',
              rules: [

              ],
            })(<CheckboxGroup options={rangeOptions} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="顺序">
            {getFieldDecorator('sort', {
              initial: 1,
            })(
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={100}
                placeholder="请输入排序"
              />,
            )}
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
  Form.create()(withStyles(s)(GroupTagsModal)),
);
