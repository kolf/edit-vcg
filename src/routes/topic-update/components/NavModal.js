import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  Checkbox,
  message,
  InputNumber,
} from 'antd';
import KeywordGroup from 'components/KeywordGroup';
import SearchSelect from 'components/SearchSelect';
import { getOptions } from 'data/optionsMaps';
import moment from 'moment';

import { createTopicNav } from 'actions/topicNavs';
import s from './NavModal.less';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

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

const levels = ['', '一', '二', '三'];
const qualityRankOptions = getOptions('qualityRanks');
const graphicalStyleOptions = getOptions('graphicalStyles');

function getOptionsValue(options) {
  return Array.isArray(options)
    ? options.map(v => v.value || v.key).toString()
    : options;
}

function checkKeywords(rule, value, callback) {
  if (!Object.values(value).every(vs => vs.every(v => /^\d+$/.test(v.value)))) {
    callback('请删除不确定关键词');
  }
  callback();
}

function getTime(date) {
  return new Date(date).getTime();
}

const ManuallForm = Form.create()(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form>
      <FormItem {...formItemLayout} label="显示名称">
        {getFieldDecorator('navName', {
          rules: [
            {
              required: true,
              message: '请输入显示名称',
            },
          ],
        })(<Input placeholder="请输入显示名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="导航排序">
        {getFieldDecorator('sort', {
          initialValue: 1,
          rules: [
            {
              required: true,
              message: '请输入导航排序',
            },
          ],
        })(
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            max={100}
            placeholder="请输入导航排序"
          />,
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="默认展示方式">
        {getFieldDecorator('buildGroup', { initialValue: '1' })(
          <RadioGroup>
            <Radio value="1">组照</Radio>
            <Radio value="0">单张</Radio>
          </RadioGroup>,
        )}
      </FormItem>
      <Divider>
        <label className="ant-form-item-required" />
        导航规则
      </Divider>
      <FormItem {...formItemLayout} label="入库时间">
        {getFieldDecorator('runTime', {
          initialValue: [],
        })(
          <RangePicker
            style={{ width: '100%' }}
            placeholder={['起始日期', '结束日期']}
          />,
        )}
      </FormItem>
      {props.navLevel === 1 && (
        <FormItem {...formItemLayout} label="内容类型">
          {getFieldDecorator('graphicalStyle', {
            initialValue: [],
          })(<CheckboxGroup options={graphicalStyleOptions} />)}
        </FormItem>
      )}
      <FormItem {...formItemLayout} label="关键词">
        {getFieldDecorator('keywords', {
          initialValue: {
            allContainKeywords: [],
            anyContainKeywords: [],
            notContainKeywords: [],
          },
          rules: [
            {
              validator: checkKeywords,
            },
          ],
        })(<KeywordGroup />)}
      </FormItem>
      <FormItem {...formItemLayout} label="供应商">
        {getFieldDecorator('providerId', {
          initialValue: [],
        })(<SearchSelect paramType="6" placeholder="请输入供应商名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="图片等级">
        {getFieldDecorator('qualityRank', {
          initialValue: [],
        })(<CheckboxGroup options={qualityRankOptions} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="外链">
        {getFieldDecorator('link', {})(
          <Input addonBefore="https://" placeholder="www.vcg.com/topic/:id" />,
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <div className="btns">
          <Button type="primary" onClick={e => props.submit(e, props.form)}>
            提交
          </Button>
        </div>
      </FormItem>
    </Form>
  );
});

const AutoForm = Form.create()(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form>
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
      <FormItem {...tailFormItemLayout}>
        <div className={s.btns}>
          <Button type="primary" onClick={e => props.submit(e, props.form)}>
            提交
          </Button>
        </div>
      </FormItem>
    </Form>
  );
});

class NavModal extends Component {
  static defaultProps = {
    navLevel: 1,
    isFetching: false,
  };

  manuallFormRef = null;
  autoFormRef = null;

  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.visible === true &&
  //     this.props.visible === false &&
  //     nextProps.value
  //   ) {
  //     this.initialFormValue(nextProps.value);
  //   }
  // }

  initialFormValue = formRef => {
    const { value } = this.props;
    if (value) {
      const {
        endTime,
        beginTime,
        qualityRank,
        graphicalStyle,
        navName,
        sort,
      } = value;

      console.log(formRef);

      formRef &&
        formRef.setFieldsValue({
          navName,
          sort,
          beginTime: undefined,
          endTime: undefined,
          runTime: [moment(beginTime), moment(endTime)],
          qualityRank: (qualityRank || '').split(','),
          providerId: undefined,
          graphicalStyle: (graphicalStyle || '').split(','),
          cId: undefined,
        });
    }
    console.log(formRef, this.props.value);
  };

  manuallFormSubmit = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const {
          topicId,
          navLevel,
          dispatch,
          onOk,
          navLocation,
          parentNavId,
          value,
        } = this.props;
        let {
          keywords: {
            allContainKeywords,
            anyContainKeywords,
            notContainKeywords,
          },
          providerId,
          qualityRank,
          runTime,
          graphicalStyle,
        } = values;

        let creds = {
          ...values,
          allContainKeywords: getOptionsValue(allContainKeywords),
          anyContainKeywords: getOptionsValue(anyContainKeywords),
          notContainKeywords: getOptionsValue(notContainKeywords),
          navId: value ? value.navId : '',
          topicId,
          navLevel,
          navLocation,
          parentNavId,
          providerId: getOptionsValue(providerId),
          graphicalStyle: (graphicalStyle || []).join(','),
          qualityRank: (qualityRank || []).join(','),
          endTime: getTime(runTime[0]),
          beginTime: getTime(runTime[1]),
          keywords: undefined,
          runTime: undefined,
        };

        dispatch(createTopicNav(creds)).then(msg => {
          message.success(msg);
          onOk();
        });
      }
    });
  };

  autoFormSubmit = (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { topicId, navLevel, dispatch, onOk, parentNavId } = this.props;

        let creds = Object.assign({}, values, {
          topicId,
          navLevel,
          parentNavId,
        });

        dispatch(createTopicNav(creds)).then(msg => {
          message.success(msg);
          onOk();
        });
      }
    });
  };

  render() {
    const { visible, onCancel, navLevel, value } = this.props;

    const props = {
      width: 800,
      title: (value ? '编辑' : '添加') + levels[navLevel] + '级导航',
      visible,
      onCancel,
      footer: null,
      destroyOnClose: true,
    };

    return (
      <Modal {...props} className={s.root}>
        <Tabs tabBarStyle={{ textAlign: 'center', fontSize: 14 }} type="card">
          <TabPane tab="手动" key="manuall">
            <ManuallForm
              ref={this.initialFormValue}
              navLevel={navLevel}
              submit={this.manuallFormSubmit}
            />
          </TabPane>
          <TabPane tab="自动" key="auto">
            <AutoForm
              wrappedComponentRef={f => (this.autoFormRef = f)}
              navLevel={navLevel}
              submit={this.autoFormSubmit}
            />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    confirmLoading: state.topicNavs.isFetching,
  };
}

export default connect(mapStateToProps)(withStyles(s)(NavModal));
