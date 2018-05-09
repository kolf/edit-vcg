import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Modal, Input, message, Tag, Icon } from 'antd';
import s from './FilterRss.less';

const { CheckableTag } = Tag;
const confirm = Modal.confirm;

class FilterRss extends Component {
  static propTypes = {
    onTag: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  state = {
    visible: false,
    rssList: [],
    newName: '',
  };

  rssNameInputRef = null;

  handlerClick = e => {
    this.setState({
      visible: true,
    });
    console.log(this);
  };

  handlerChangeName = e => {
    this.setState({
      newName: e.target.value,
    });
  };

  createRss = () => {
    const { newName, rssList } = this.state;
    if (!newName) {
      message.error('请输入订阅名！');
      return;
    }

    rssList.push({
      label: newName,
      value: Date.now(),
    });

    this.closeModal();
  };

  handlerClickTag = id => {
    const { onTag } = this.props;
    const { rssList } = this.state;
    rssList.forEach(r => {
      r.active = false;
      if (r.value === id) {
        r.active = true;
      }
    });

    onTag();

    this.setState({
      rssList,
    });
  };

  handlerClickRemove = id => {
    const _this = this;
    confirm({
      title: '删除订阅?',
      content: '删除订阅后需要重新订阅',
      okText: '确定',
      cancelText: '取消',
      onOk,
    });

    function onOk() {
      let { rssList } = _this.state;
      rssList = rssList.filter(r => r.value !== id);
      if (rssList.length > 0) {
        rssList[0].active = true;
      }
      _this.setState({ rssList });
    }
  };

  closeModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, newName, rssList, curRss } = this.state;
    return (
      <div className={s.root}>
        <Modal
          title="添加订阅"
          visible={visible}
          okText="确认"
          cancelText="取消"
          onOk={this.createRss}
          onCancel={this.closeModal}
        >
          <Input
            placeholder="请输入订阅名称"
            value={newName}
            onChange={this.handlerChangeName}
          />
        </Modal>
        <div className={s.tags}>
          {rssList.map(r => (
            <CheckableTag
              key={r.value}
              onChange={this.handlerClickTag.bind(this, r.value)}
              checked={r.active}
            >
              {r.label}{' '}
              <Icon
                type="cross"
                onClick={this.handlerClickRemove.bind(this, r.value)}
              />
            </CheckableTag>
          ))}
        </div>
        <Button size="small" type="primary" onClick={this.handlerClick}>
          订阅
        </Button>
      </div>
    );
  }
}

FilterRss.propTypes = {};

export default withStyles(s)(FilterRss);
