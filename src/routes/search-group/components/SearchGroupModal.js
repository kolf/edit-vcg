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
import { postSearch } from 'actions/searchGroups';
import KeywordTag from 'components/KeywordTag';

import s from './SearchGroupModal.css';

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

const levels = ['', '一', '二'];
const scopes = [
  {
    value: ['1'],
    label: '图片说明',
    key: '1',
  },
  {
    value: ['2'],
    label: '图片关键词',
    key: '2',
  },
  {
    value: ['1', '2'],
    label: '图片说明,图片关键词',
    key: '3',
  },
];
const scopeOptions = scopes.reduce((result, scope) => {
  const { key, label } = scope;
  if (key < 3) {
    result.push({
      value: key,
      label,
    });
  }
  return result;
}, []);

function getOptionValues(options) {
  return Array.isArray(options)
    ? options.map(v => v.value || v.key).toString()
    : '';
}

function getScopeValue(value) {
  if (value.length === 0) {
    return '';
  }
  return scopes.find(s => {
    return s.value.join(',') == value.join(',');
  }).key;
}

function checkKeywords(rule, value, callback) {
  if (
    !Object.values(value).every(v => {
      console.log(v);
      return /^\d+$/.test(v.value);
    })
  ) {
    callback('请删除不确定关键词');
  }
  callback();
}

class SearchGroupModal extends React.Component {
  static propsTypes = {
    isFetching: PropTypes.bool,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visible === true &&
      this.props.visible === false &&
      nextProps.value
    ) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.setFieldsValue();
      }, 300);
    }
  }

  setFieldsValue = () => {
    const { form, value: { name, keywords, scope, sort } } = this.props;
    form.setFieldsValue({
      name,
      scope: scope ? scopes[scope - 1].value : [],
      sort,
      keywords: keywords ? keywords.split(',') : [],
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { groupId, parentId, value } = this.props;
        console.log(parentId);
        let creds = Object.assign({}, values, {
          keywords: getOptionValues(values.keywords),
          scope: getScopeValue(values.scope),
          pid: parentId,
          id: value ? value.id : undefined,
        });

        this.props.dispatch(postSearch(creds, groupId)).then(msg => {
          this.props.onOk();
        });
      }
    });
  };

  render() {
    const { visible, onCancel, onOk, value, level } = this.props;
    const { getFieldDecorator } = this.props.form;

    const props = {
      width: 800,
      title: `${value ? '修改' : '添加'}${levels[level]}筛选项`,
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
            {getFieldDecorator('name', {
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
              rules: [
                {
                  validator: checkKeywords,
                },
              ],
            })(<KeywordTag />)}
          </FormItem>

          <FormItem {...formItemLayout} label="搜索范围">
            {getFieldDecorator('scope', {
              initialValue: ['1', '2'],
            })(<CheckboxGroup options={scopeOptions} />)}
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

export default withStyles(s)(
  connect(mapStateToProps)(Form.create()(SearchGroupModal)),
);
