import React, { Component } from 'react';
import { Modal } from 'antd';
import TagGroup from './TagGroup';

class TagModal extends Component {
  render() {
    const props = {
      groupSearchs: [],
      ...this.props,
      width: 800,
      title: '批量设置筛选',
      cancelText: '取消',
      okText: '确定',
      groupSearchs: undefined
    };

    const items = this.props.groupSearchs || [];

    const placeholder = items.length === 0 ? '该模版筛选项为空~' : undefined;

    return (
      <Modal {...props}>
        <TagGroup placeholder={placeholder} items={items} />
      </Modal>
    );
  }
}

export default TagModal;
