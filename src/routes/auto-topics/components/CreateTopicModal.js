import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Form, Button, Modal, Input, Radio } from 'antd';
import CategorySelect from 'components/CategorySelect';

import s from './CreateTopicModal.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;

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

const CreateTopicModal = Form.create()(
  class extends React.Component {
    static propsTypes = {
      visible: PropTypes.bool.isRequired,
    };

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
      const { getFieldDecorator } = this.props.form;

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
          <Form>
            <FormItem {...formItemLayout} label="组照标题">
              {getFieldDecorator('f1', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请输入专题名称，最多可输入40个字符" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="所属专题ID">
              {getFieldDecorator('f2', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input placeholder="请填写专题ID" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="分类">
              {getFieldDecorator('f3', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<CategorySelect />)}
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
