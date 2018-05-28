import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Modal, Input, message, Tag, Icon } from 'antd';
import s from './FilterRss.less';

const { CheckableTag } = Tag;
// const confirm = Modal.confirm;

class FilterRss extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  state = {
    modalVisible: false,
    options: [],
    value: '',
  };

  handleClick = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleNameChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  createTag = () => {
    const { value, options } = this.state;
    if (!value) {
      message.error('请输入订阅名！');
      return;
    }

    options.push({
      label: value,
      value: Date.now(),
    });

    this.closeModal();
  };

  handleTagClick = id => {
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

  handleCloseClick = id => {
    const onOk = () => {
      let { options } = this.state;
      options = options.filter(r => r.value !== id);
      if (options.length > 0) {
        options[0].active = true;
      }
      this.setState({ options });
    };

    Modal.confirm({
      title: '删除订阅?',
      content: '删除订阅后需要重新订阅',
      okText: '确定',
      cancelText: '取消',
      onOk,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { modalVisible, value, options } = this.state;
    return (
      <div className={s.root}>
        <Modal
          title="添加订阅"
          modalVisible={modalVisible}
          okText="确认"
          cancelText="取消"
          onOk={this.createTag}
          onCancel={this.closeModal}
        >
          <Input
            placeholder="请输入订阅名称"
            value={value}
            onChange={this.handleNameChange}
          />
        </Modal>
        <div className={s.tags}>
          {options.map(r => (
            <CheckableTag
              key={r.value}
              onChange={() => this.handleTagClick(r.value)}
              checked={r.active}
            >
              {r.label}{' '}
              <Icon
                type="cross"
                onClick={() => this.handleCloseClick(r.value)}
              />
            </CheckableTag>
          ))}
        </div>
        <Button size="small" type="primary" onClick={this.handleClick}>
          订阅
        </Button>
      </div>
    );
  }
}

export default withStyles(s)(FilterRss);
