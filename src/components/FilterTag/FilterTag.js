import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Modal, Input, message, Tag, Icon, Form } from 'antd';
import s from './FilterTag.less';

const { CheckableTag } = Tag;
const FormItem = Form.Item;
// const confirm = Modal.confirm;

const FormModal = Form.create()(
  class extends React.Component {
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
          visible={visible}
          title={'添加' + tagTitle}
          okText="确认"
          cancelText="取消"
          onCancel={onCancel}
          onOk={this.handleSubmit}
        >
          <Form layout="vertical">
            <FormItem label="名称">
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
  },
);

class FilterTag extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '订阅',
  };

  state = {
    modalVisible: false,
    options: [],
  };

  createTag = ({ name }) => {
    const { options } = this.state;

    options.push({
      label: name,
      value: Date.now(),
    });

    this.hideModal();
  };

  handleClick = id => {
    const { onClick } = this.props;
    const { options } = this.state;

    const newOptions = options.map(option => {
      option.active = false;
      if (option.value === id) {
        option.active = true;
      }
      return option;
    });

    onClick();

    this.setState({
      options: newOptions,
    });
  };

  handleClose = id => {
    const onOk = () => {
      let { options } = this.state;
      options = options.filter(r => r.value !== id);
      if (options.length > 0) {
        options[0].active = true;
      }
      this.setState({ options });
    };

    const { title } = this.props;
    Modal.confirm({
      title: `删除${title}`,
      content: `删除${title}后需要重新添加`,
      okText: '确定',
      cancelText: '取消',
      onOk,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    const { style, title } = this.props;
    const { modalVisible, value, options } = this.state;
    return (
      <div className={s.root} style={style || null}>
        <FormModal
          visible={modalVisible}
          onCancel={this.hideModal}
          onOk={this.createTag}
          tagTitle={title}
        />
        <div className={s.list}>
          {options.map(r => (
            <CheckableTag
              key={r.value}
              onChange={() => this.handleClick(r.value)}
              checked={r.active}
            >
              {r.label}{' '}
              <Icon type="cross" onClick={() => this.handleClose(r.value)} />
            </CheckableTag>
          ))}
        </div>
        <div className={s.btn}>
          <Button
            size="small"
            type="primary"
            icon="plus-circle"
            onClick={this.showModal}
          >
            {title}
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(FilterTag);
