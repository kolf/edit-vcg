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
} from 'antd';
import s from './NavUpdateModal.less';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};

const NavUpdateModal = Form.create()(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tagType: '1',
        showTagRule: false,
      };
    }

    handleSubmit = () => {};

    toggleTagRule = () => {
      const showTagRule = !this.state.showTagRule;

      this.setState({
        showTagRule,
      });
    };

    render() {
      const { visible, onClose, navType } = this.props;
      const { getFieldDecorator, getFieldsValue } = this.props.form;
      const { tagType, showTagRule } = this.state;

      const title = navType === '1' ? '一级导航' : '二级导航';

      const props = {
        width: 800,
        title,
        visible,
        okText: '提交',
        cancelText: '取消',
        onCancel: onClose,
        onOk: () => {
          // console.log()
          const data = getFieldsValue();
          onClose(data);
        },
        // footer: null
      };

      return (
        <Modal {...props} className={s.navUpdateModal}>
          <Form>
            <FormItem {...formItemLayout} label="显示名称">
              {getFieldDecorator('f1', {
                rules: [
                  {
                    required: true,
                    message: '请输入显示名称',
                  },
                ],
              })(<Input placeholder="请输入显示名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="导航排序">
              {getFieldDecorator('f2', {
                rules: [
                  {
                    required: true,
                    message: '请输入导航排序',
                  },
                ],
              })(<Input placeholder="请输入导航排序" />)}
            </FormItem>

            <Divider>
              <label className="ant-form-item-required" /> 导航规则
            </Divider>

            <FormItem {...formItemLayout} label="入库时间">
              {getFieldDecorator('f3', {})(
                <RangePicker placeholder={['起始日期', '结束日期']} />,
              )}
            </FormItem>
            {navType === '1' && (
              <FormItem {...formItemLayout} label="内容类型">
                {getFieldDecorator('f4', {})(
                  <RadioGroup>
                    <Radio value="a">摄影图片</Radio>
                    <Radio value="b">插画</Radio>
                    <Radio value="c">漫画</Radio>
                    <Radio value="d">图表</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
            )}
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('f9', {
                initialValue: '1',
                onChange: e => {
                  this.setState({
                    tagType: e.target.value,
                  });
                },
              })(
                <RadioGroup>
                  <RadioButton value="1">包含关键词</RadioButton>
                  <RadioButton value="2">自动抓取人物关键词</RadioButton>
                </RadioGroup>,
              )}
            </FormItem>
            {tagType === '1' && (
              <FormItem {...formItemLayout} label="包含全部关键词">
                {getFieldDecorator('f10', {})(
                  <div style={{ position: 'relative' }}>
                    <Input placeholder="输入多个关键词时可用逗号隔开" />
                    <Button
                      icon={showTagRule ? 'up' : 'down'}
                      className={s.toggleTagBtn}
                      onClick={this.toggleTagRule}
                    />
                  </div>,
                )}
              </FormItem>
            )}
            {tagType === '1' &&
              showTagRule && [
                <FormItem {...formItemLayout} label="包含任意一个关键词">
                  {getFieldDecorator('f11', {})(
                    <Input placeholder="输入多个关键词时可用逗号隔开" />,
                  )}
                </FormItem>,
                <FormItem {...formItemLayout} label="不包含关键词">
                  {getFieldDecorator('f12', {})(
                    <Input placeholder="输入多个关键词时可用逗号隔开" />,
                  )}
                </FormItem>,
              ]}
            {tagType === '2' && (
              <FormItem {...formItemLayout} label="自动抓取人物关键词">
                {getFieldDecorator('f10', {})(
                  <RadioGroup>
                    <Radio value="a">二级筛选项显示</Radio>
                    <Radio value="b">复制新建组&二级筛选项显示</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
            )}
            <FormItem {...formItemLayout} label="供应商">
              {getFieldDecorator('f6', {})(
                <Input placeholder="请输入供应商名称" />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="图片等级">
              {getFieldDecorator('f7', {})(
                <RadioGroup>
                  <Radio value="a">A</Radio>
                  <Radio value="b">B</Radio>
                  <Radio value="c">C</Radio>
                  <Radio value="d">D</Radio>
                </RadioGroup>,
              )}
            </FormItem>
            {navType === '2' && (
              <FormItem {...formItemLayout} label="外链">
                {getFieldDecorator('f6', {})(<Input />)}
              </FormItem>
            )}
          </Form>
        </Modal>
      );
    }
  },
);

export default withStyles(s)(NavUpdateModal);
