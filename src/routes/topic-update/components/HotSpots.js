import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tag, Icon, Modal, Form } from 'antd';

import UpdateModal from './UpdateModal';

import s from './HotSpots.less';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

const panes = [
  {
    label: '第一届XXXX颁奖典礼',
    value: 31,
    index: 1,
  },
  {
    label: '第一届XXXX颁奖典礼',
    value: 32,
    index: 2,
  },
];

class HotSpots extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      panes,
      updateModalVisible: false,
    };
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  showUpdateModal = () => {
    this.setState({
      updateModalVisible: true,
    });
  };

  hideUpdateModal = () => {
    this.setState({
      updateModalVisible: false,
    });
  };

  remove = menu => {
    confirm({
      title: `删除`,
      content: '删除菜单后，子菜单也会被删除',
      okText: '确认删除',
      cancelText: '我再想想',
      onOk() {
        console.log('OK');
      },
    });
  };

  render() {
    const { updateModalVisible } = this.state;

    return (
      <div className={s.hotSpots}>
        <UpdateModal
          visible={updateModalVisible}
          onClose={this.hideUpdateModal}
        />
        {panes.map((c, j) => (
          <div
            key={`c${j}`}
            className="ant-tag"
            onDoubleClick={this.showUpdateModal}
          >
            {c.label} <Icon type="cross" onClick={this.remove} />
          </div>
        ))}
        <Tag onClick={this.showUpdateModal}>
          添加<Icon type="plus" />
        </Tag>
      </div>
    );
  }
}

export default withStyles(s)(HotSpots);
