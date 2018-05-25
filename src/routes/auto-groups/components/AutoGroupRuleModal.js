import React from 'react';
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
  Checkbox,
  Alert,
  Row,
  Col,
  Spin,
  message,
} from 'antd';
import KeywordGroup from 'components/KeywordGroup';
import CategorySelect from 'components/CategorySelect';
import {
  fetchAutoGroupRule,
  updateAutoGroupRule,
  stopAutoGroupRule,
} from 'actions/autoGroupRule';
import { fetchKeywordDict } from 'actions/keywordDict';
import { getOptionName, getOptions } from 'data/optionsMaps';
import moment from 'moment';
import gs from 'components/App.less';
import s from './AutoGroupRuleModal.less';

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

const defaultName = '---';

function getTime(date) {
  return new Date(date).getTime();
}

function getKeywordIds(values) {
  return Array.isArray(values) ? values.map(v => v.value).toString() : '';
}

class GroupRuleModal extends React.Component {
  static propsTypes = {};

  static defaultProps = {
    confirmLoading: false,
    isFetching: false,
    group: {},
    id: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visible === true &&
      this.props.visible === false &&
      nextProps.groupId
    ) {
      this.getGroupRule(nextProps.groupId);
    }
  }

  getGroupRule = id => {
    this.props.dispatch(fetchAutoGroupRule({ id })).then(groupRule => {
      console.log(groupRule);
      if (!groupRule) {
        return;
      }
      let {
        category,
        uploadBeginTime,
        uploadEndTime,
        isOnline,
        allContainKeywords,
        anyContainKeywords,
        notContainKeywords,
      } = groupRule;

      if (allContainKeywords || anyContainKeywords || notContainKeywords) {
        this.initKeywordValue(
          allContainKeywords,
          anyContainKeywords,
          notContainKeywords,
        );
      }

      this.props.form.setFieldsValue({
        isOnline: isOnline === 1,
        runTime: [
          moment(uploadBeginTime),
          uploadEndTime ? moment(uploadEndTime) : null,
        ],
        category: /\d+/.test(category + '') ? category.match(/\d+/g) : [],
      });
    });
  };

  initKeywordValue = (...args) => {
    this.props
      .dispatch(
        fetchKeywordDict({
          data: args.toString(),
        }),
      )
      .then(keywordMap => {
        let keywords = [
          'allContainKeywords',
          'anyContainKeywords',
          'notContainKeywords',
        ].reduce((result, key, index) => {
          const ids = args[index].match(/\d+/g);
          result[key] = ids ? ids.map(id => keywordMap[id]) : [];
          return result;
        }, {});

        this.props.form.setFieldsValue({ keywords });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { keywords, category, isOnline, runTime } = values;
        let {
          allContainKeywords,
          anyContainKeywords,
          notContainKeywords,
        } = keywords;

        // console.log()
        let categoryIds = isNaN(category)
          ? category.map(c => c.value)
          : category;

        const creds = {
          allContainKeywords: getKeywordIds(allContainKeywords),
          anyContainKeywords: getKeywordIds(anyContainKeywords),
          notContainKeywords: getKeywordIds(notContainKeywords),
          category: Array.isArray(category)
            ? category
                .map(c => (typeof c === 'string' ? c : c.value))
                .toString()
            : category,
          isOnline: isOnline ? '1' : '0',
          endTime: getTime(runTime[0]),
          beginTime: getTime(runTime[1]),
          groupId: this.props.groupId + '',
          topicId: this.props.group.topicId,
        };
        this.props.dispatch(updateAutoGroupRule(creds)).then(msg => {
          message.success('专题规则更新成功');
          this.props.onOk();
        });
      }
    });
  };

  handleStopClick = e => {
    this.props
      .dispatch(
        stopAutoGroupRule({
          id: this.props.groupId,
        }),
      )
      .then(msg => {
        message.success(msg);
        this.props.onOk();
      });
  };

  render() {
    const { visible, onCancel, onOk, group } = this.props;
    const { getFieldDecorator, getFieldsValue } = this.props.form;

    const props = {
      width: 800,
      title: '修改抓取规则',
      visible,
      okText: '提交',
      cancelText: '取消',
      onCancel,
      onOk,
      footer: null,
      destroyOnClose: true,
    };

    console.log('group-------------', group);

    return (
      <Modal {...props} className={s.root}>
        <Spin spinning={this.props.isFetching}>
          <Row className={s.info}>
            <Col span="6">组照ID: {group.groupId}</Col>
            <Col span="15">组照名称: {group.title} </Col>
            <Col span="3">
              状态：{getOptionName('runningStatus', group.runningStatus + '')}
            </Col>
            <Col span="10">
              任务抓取开始时间：{group.uploadBeginTime || defaultName}
            </Col>
            <Col span="10">
              任务抓取结束时间: {group.uploadEndTime || defaultName}
            </Col>
            <Col span="4">抓取数量：--- </Col>
          </Row>
          <Form>
            <Divider>抓取规则</Divider>
            <FormItem {...formItemLayout} label="抓取入库时间">
              {getFieldDecorator('runTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择抓取入库时间',
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
              {getFieldDecorator('category', {
                initialValue: [],
                rules: [
                  {
                    required: true,
                    message: '请选择抓取分类',
                  },
                ],
              })(<CategorySelect />)}
            </FormItem>

            <FormItem {...formItemLayout} label="抓取关键词">
              {getFieldDecorator('keywords', {
                initialValue: {},
                rules: [
                  {
                    required: true,
                    message: '请选择填写关键词规则',
                  },
                ],
              })(<KeywordGroup />)}
            </FormItem>

            <Divider className={gs.divider} />
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('isOnline', {
                valuePropName: 'checked',
              })(<Checkbox>抓取完成后将未上线的图片做上线操作</Checkbox>)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <div className={gs.btns}>
                <Button
                  type="primary"
                  className="mr-5"
                  onClick={this.handleSubmit}
                  loading={this.props.confirmLoading}
                >
                  提交
                </Button>
                <Button
                  loading={this.props.stopGroupFetching}
                  onClick={this.handleStopClick}
                >
                  结束抓取
                </Button>
              </div>
              <Alert
                message="注：修改抓取规则提交后，之前进行中的任务结束，按新规则重新进行抓取，之前抓取的组照还在该专题下。如果抓取任务正在进行，可点击结束抓取来终止自动抓取行为"
                type="warning"
                showIcon
              />
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    isFetching: state.autoGroupRule.isFetching,
    confirmLoading: state.autoGroupRule.confirmLoading,
    group: state.autoGroups.list.find(item => item.groupId == props.groupId),
    stopGroupFetching: state.autoGroup.isFetching,
  };
}

export default connect(mapStateToProps)(
  Form.create()(withStyles(gs, s)(GroupRuleModal)),
);
