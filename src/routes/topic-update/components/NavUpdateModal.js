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
  Tabs,
} from 'antd';
import KeywordGroup from 'components/KeywordGroup';
import gs from 'components/App.less';
import s from './NavUpdateModal.less';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TabPane = Tabs.TabPane;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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
class NavUpdateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTagRule: false,
    };
  }

  handleSubmit = () => {};

  changeTab = val => {
    console.log(val);
  };

  render() {
    const { visible, onClose, navType } = this.props;
    const { getFieldDecorator, getFieldsValue } = this.props.form;

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
      <Modal {...props} className={s.root}>
        <Form>
          <Tabs
            tabBarStyle={{ textAlign: 'center', fontSize: 14 }}
            onChange={this.changeTab}
            type="card"
          >
            <TabPane tab="手动" key="tabPane1">
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

              <FormItem {...formItemLayout} label="默认展示方式">
                {getFieldDecorator('f5', { initialValue: '1' })(
                  <RadioGroup>
                    <Radio value="1">组照</Radio>
                    <Radio value="2">单张</Radio>
                  </RadioGroup>,
                )}
              </FormItem>

              <Divider>
                <label className="ant-form-item-required" />
                导航规则
              </Divider>

              <FormItem {...formItemLayout} label="入库时间">
                {getFieldDecorator('f3', {})(
                  <RangePicker
                    style={{ width: '100%' }}
                    placeholder={['起始日期', '结束日期']}
                  />,
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

              <FormItem {...formItemLayout} label="关键词">
                {getFieldDecorator('f10', {})(<KeywordGroup />)}
              </FormItem>

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
              <FormItem {...formItemLayout} label="外链">
                {getFieldDecorator('f6', {})(
                  <Input
                    addonBefore="Https://"
                    placeholder="www.vcg.com/topic/:id"
                  />,
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="自动" key="tabPane2">
              <FormItem {...formItemLayout} label="自动抓取人物关键词">
                {getFieldDecorator('f7', {
                  rules: [
                    {
                      required: true,
                      message: '请选择抓取方式',
                    },
                  ],
                })(
                  <RadioGroup>
                    <Radio value="1">二级筛选项显示</Radio>
                    <Radio value="2">复制新建组&二级筛选项显示</Radio>
                  </RadioGroup>,
                )}
              </FormItem>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  }
}

export default withStyles(s)(Form.create()(NavUpdateModal));
