import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
} from 'antd';
import TagFormGroup from 'components/TagFormGroup';
import CategorySelect from 'components/CategorySelect';

import s from './CreateTopicModal.less';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
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

const assetOptions = [
  {
    value: '1',
    label: '时效',
  },
  {
    value: '2',
    label: '资料',
  },
];

const statusOptions = [
  {
    value: '1',
    label: '已上线/审核',
  },
  {
    value: '2',
    label: '已上线/自动',
  },
  {
    value: '3',
    label: '未上线/未编审',
  },
];

const rangeOptions = [
  {
    value: '1',
    label: '关键词/组关键词',
  },
  {
    value: '2',
    label: '图说/组说',
  },
];

const CreateTopicModal = Form.create()(
  class extends React.Component {
    static propsTypes = {};

    constructor(props) {
      super(props);
      this.state = {};
    }

    handlerClickSubmit = e => {
      const { onClose } = this.props;
      onClose();
    };

    handlerClickStop = e => {
      const { onClose } = this.props;
      onClose();
    };

    render() {
      const { visible, onClose } = this.props;
      const { getFieldDecorator, getFieldsValue } = this.props.form;

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
              {getFieldDecorator('f3', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请输入专题名称，最多可输入40个字符" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="发布频道">
              {getFieldDecorator('f2', {
                rules: [
                  {
                    required: true,
                    message: '请选择发布频道',
                  },
                ],
              })(<CategorySelect />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="发布时间"
              help="不选择即提交后立即发布"
            >
              {getFieldDecorator('f1', {})(
                <DatePicker placeholder="请选择发布时间" />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="时效/资料">
              {getFieldDecorator('f8', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<RadioGroup options={assetOptions} />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <div className="btns">
                <Button
                  type="primary"
                  className="mr-5"
                  onClick={this.handlerClickSubmit}
                >
                  提交
                </Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
      );
    }
  },
);

export default withStyles(s)(CreateTopicModal);
