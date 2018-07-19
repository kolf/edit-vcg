import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

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

const UpdateModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, form, onClose } = this.props;
      const { getFieldDecorator, getFieldsValue } = form;

      const props = {
        width: 800,
        visible,
        title: '热点推荐',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          const data = getFieldsValue();
          onClose(data);
        },
        onCancel: onClose,
      };

      return (
        <Modal {...props}>
          <Form>
            <FormItem label="显示名称" {...formItemLayout}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入显示名称',
                  },
                ],
              })(<Input placeholder="请输入显示名称" />)}
            </FormItem>
            <FormItem label="链接地址" {...formItemLayout}>
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入链接地址',
                  },
                ],
              })(<Input placeholder="请输入链接地址" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  },
);

export default UpdateModal;
