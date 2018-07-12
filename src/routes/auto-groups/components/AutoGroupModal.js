import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Form, Button, Modal, Input, Radio, Select, message } from 'antd';
import CategorySelect from 'components/CategorySelect';

import { getOptions } from 'data/optionsMaps';
import { createAutoGroup } from 'actions/autoGroup';

import s from './AutoGroupModal.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
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

const categoryOptions = getOptions('categorys');

class AutoGroupModal extends React.Component {
  static propsTypes = {
    isSubmiting: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isSubmiting: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let creds = Object.assign({}, values);
        creds.category = values.category.map(c => c.value).toString();

        this.props
          .dispatch(createAutoGroup(creds))
          .then(data => {
            message.success(this.props.message);
            this.props.onOk();
          })
          .catch(err => console.error(err, 'error'));
      }
    });
  };

  render() {
    const { visible, onCancel, onOk } = this.props;
    const { getFieldDecorator } = this.props.form;

    const props = {
      width: 800,
      title: '创建组照',
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
          <FormItem {...formItemLayout} label="组照标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入组照标题',
                },
              ],
            })(<Input placeholder="请输入专题名称，最多可输入40个字符" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="所属专题ID">
            {getFieldDecorator('topicId', {
              rules: [
                {
                  required: true,
                  message: '请输入所属专题ID',
                },
              ],
            })(<Input placeholder="请填写专题ID" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="分类">
            {getFieldDecorator('category', {
              initialValue: [],
              rules: [
                {
                  required: true,
                  message: '请选择分类',
                },
              ],
            })(<CategorySelect oneCategoryMultiple={true} />)}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <div className="btns">
              <Button
                type="primary"
                loading={this.props.isSubmiting}
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

function mapStateToProps(state, props) {
  return {
    isSubmiting: state.autoGroup.isFetching,
    message: state.autoGroup.message,
  };
}

export default connect(mapStateToProps)(
  Form.create()(withStyles(s)(AutoGroupModal)),
);
