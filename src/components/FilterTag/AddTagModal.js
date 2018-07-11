import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
// const confirm = Modal.confirm;
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

class AddTagModal extends React.PureComponent {
  handleSubmit = () => {
    const { form, onOk } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();
      onOk(values);
    });
  };

  render() {
    const { visible, onCancel, form, tagTitle } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        width={540}
        visible={visible}
        title={`添加${tagTitle}`}
        okText="确认"
        cancelText="取消"
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form>
          <FormItem {...formItemLayout} label={`${tagTitle}名称`}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
              ],
            })(<Input placeholder="请输入名称" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddTagModal);
