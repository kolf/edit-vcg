import React, { Component } from 'react';
import { Modal } from 'antd';
import TagGroup from './TagGroup';

class TagModal extends Component {
  render() {
    const props = {
      ...this.props,
      width: 800,
      title: '批量设置筛选',
      cancelText: '取消',
      okText: '确定',
    };

    return (
      <Modal {...props}>
        <TagGroup />
      </Modal>
    );
  }
}

export default TagModal;
