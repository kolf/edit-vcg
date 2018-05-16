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

import gs from 'components/App.less';
import s from './SetAutoRuleModal.less';

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

const SetAutoRuleModal = Form.create()(
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
        title: '编辑自动抓取图/组规则',
        visible,
        okText: '提交',
        cancelText: '取消',
        onCancel: onClose,
        footer: null,
      };

      return (
        <Modal {...props} className={s.root}>
          <Row className={s.info}>
            <Col span="6">专题ID：123456</Col>
            <Col span="18">专题名称：XXXXXXXXXXXXX </Col>
            <Col span="7">任务抓取开始时间：2018-1-29 15:02</Col>
            <Col span="7">任务抓取结束时间: --</Col>
            <Col span="5">状态：抓取中</Col>
            <Col span="5">抓取结果：100张/ 20组 </Col>
          </Row>
          <Form>
            <Divider>抓取规则</Divider>
            <FormItem {...formItemLayout} label="抓取入库时间">
              {getFieldDecorator('f1', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={['起始日期', '结束日期']}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="抓取分类">
              {getFieldDecorator('f2', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<CategorySelect />)}
            </FormItem>

            <FormItem {...formItemLayout} label="抓取关键词">
              {getFieldDecorator('f6', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TagFormGroup />)}
            </FormItem>

            <Divider className="divider-sm" />
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('f9', {})(
                <Checkbox>抓取完成后将未上线的图片做上线操作</Checkbox>,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <div className={gs.btns}>
                <Button type="primary" onClick={this.handlerClickSubmit}>
                  提交
                </Button>
                <Button onClick={this.handlerClickStop}>结束抓取</Button>
              </div>
              <Alert
                message="注：修改抓取规则提交后，之前进行中的任务结束，按新规则重新进行抓取，之前抓取的组照还在该专题下。如果抓取任务正在进行，可点击结束抓取来终止自动抓取行为"
                type="warning"
                showIcon
              />
            </FormItem>
          </Form>
        </Modal>
      );
    }
  },
);

export default withStyles(gs, s)(SetAutoRuleModal);
