import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tag, Icon, Button, Modal } from 'antd';
import NavUpdateModal from './NavUpdateModal';
import s from './MainNav.less';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

const panes = [
  {
    title: '编辑图片',
    content: [
      {
        label: '前瞻内容',
        value: 11,
        index: 0,
      },
      {
        label: '刘德华',
        value: 12,
        index: 1,
      },
      {
        label: '梁静茹',
        value: 13,
        index: 2,
      },
      {
        label: '梁咏琪',
        value: 14,
        index: 3,
      },
      {
        label: '孙俪',
        value: 15,
        index: 4,
      },
      {
        label: '王力宏',
        value: 16,
        index: 5,
      },
      {
        label: '邓超',
        value: 11,
        index: 0,
      },
      {
        label: '刘德华',
        value: 12,
        index: 1,
      },
      {
        label: '梁静茹',
        value: 13,
        index: 2,
      },
      {
        label: '梁咏琪',
        value: 14,
        index: 3,
      },
      {
        label: '孙俪',
        value: 15,
        index: 4,
      },
      {
        label: '王力宏',
        value: 16,
        index: 5,
      },
      {
        label: '邓超',
        value: 11,
        index: 0,
      },
      {
        label: '刘德华',
        value: 12,
        index: 1,
      },
      {
        label: '梁静茹',
        value: 13,
        index: 2,
      },
      {
        label: '梁咏琪',
        value: 14,
        index: 3,
      },
      {
        label: '孙俪',
        value: 15,
        index: 4,
      },
      {
        label: '王力宏',
        value: 16,
        index: 5,
      },
      {
        label: '邓超',
        value: 11,
        index: 0,
      },
      {
        label: '刘德华',
        value: 12,
        index: 1,
      },
      {
        label: '梁静茹',
        value: 13,
        index: 2,
      },
      {
        label: '梁咏琪',
        value: 14,
        index: 3,
      },
      {
        label: '孙俪',
        value: 15,
        index: 4,
      },
      {
        label: '王力宏',
        value: 16,
        index: 5,
      },
      {
        label: '邓超',
        value: 11,
        index: 0,
      },
      {
        label: '刘德华',
        value: 12,
        index: 1,
      },
      {
        label: '梁静茹',
        value: 13,
        index: 2,
      },
      {
        label: '梁咏琪',
        value: 14,
        index: 3,
      },
      {
        label: '孙俪',
        value: 15,
        index: 4,
      },
      {
        label: '王力宏',
        value: 16,
        index: 5,
      },
      {
        label: '刘德华',
        value: 12,
        index: 1,
      },
      {
        label: '梁咏琪',
        value: 14,
        index: 3,
      },
      {
        label: '孙俪',
        value: 15,
        index: 4,
      },
    ],
    key: '1',
  },
  {
    title: '编辑视频',
    content: [
      {
        label: '孙俪',
        value: 21,
        index: 1,
      },
      {
        label: '王力宏',
        value: 22,
        index: 2,
      },
    ],
    key: '2',
  },
  {
    title: '创意图片',
    content: [
      {
        label: '刘德华',
        value: 31,
        index: 1,
      },
      {
        label: '梁静茹',
        value: 32,
        index: 2,
      },
      {
        label: '梁咏琪',
        value: 33,
        index: 3,
      },
      {
        label: '孙俪',
        value: 34,
        index: 4,
      },
    ],
    key: '3',
  },
  {
    title: '创意视频',
    content: [],
    key: '4',
  },
];
class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      activeKey: `${panes[0].key}0`,
      panes,
      navUpdateModalVisible: false,
      navUpdateModalType: '1', // 1 一级导航， 2， 二级导航
    };
  }

  onChange = activeKey => {
    console.log(activeKey);
    if (activeKey === 'addTab') {
      this.showNavUpdateModal('1');
      return;
    }
    this.setState({ activeKey });
  };

  remove = (navType, menu) => {
    confirm({
      title: `删除${navType === '1' ? '一' : '二'}级导航`,
      content: '删除菜单后，子菜单也会被删除',
      okText: '确认删除',
      cancelText: '我再想想',
      onOk() {
        console.log('OK');
      },
    });
  };

  showNavUpdateModal = navUpdateModalType => {
    this.setState({
      navUpdateModalType,
      navUpdateModalVisible: true,
    });
  };

  closeNavUpdateModal = data => {
    this.setState({
      navUpdateModalVisible: false,
    });
  };

  render() {
    const { navUpdateModalVisible, navUpdateModalType, activeKey } = this.state;

    return (
      <div className={s.root}>
        <NavUpdateModal
          navType={navUpdateModalType}
          visible={navUpdateModalVisible}
          onClose={this.closeNavUpdateModal}
        />
        <Tabs animated={false} onChange={this.onChange} activeKey={activeKey}>
          {this.state.panes.map((pane, index) => (
            <TabPane tab={pane.title} key={pane.key + index}>
              {index > 0 ? (
                <div className={`${s.item} ant-row ant-form-item`}>
                  <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-2">
                    前瞻内容
                  </div>
                  <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-22">
                    <div className="ant-form-item-control">
                      {pane.content.map((c, j) => (
                        <div key={`c${j}`} className="ant-tag">
                          {c.label}
                        </div>
                      ))}
                      {pane.content.length > 30 && (
                        <Tag style={{ color: '#f00' }}>更多</Tag>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={s.tags}>
                  {pane.content.map((c, j) => (
                    <div key={`c${j}`} className="ant-tag">
                      {c.label}
                    </div>
                  ))}
                  {pane.content.length > 30 && (
                    <Tag style={{ color: '#f00' }}>更多</Tag>
                  )}
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default withStyles(s)(MainNav);
