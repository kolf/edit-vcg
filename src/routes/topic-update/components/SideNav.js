import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Menu, Icon, Modal } from 'antd';
import NavUpdateModal from './NavUpdateModal';
import s from './SideNav.less';

const confirm = Modal.confirm;
const SubMenu = Menu.SubMenu;

const nav = [
  {
    title: '前瞻内容',
    content: [
      {
        label: '比赛场馆',
        value: 11,
        index: 0,
      },
      {
        label: '城市风光',
        value: 12,
        index: 1,
      },
      {
        label: '球队巡礼',
        value: 13,
        index: 2,
      },
      {
        label: '历史回顾',
        value: 14,
        index: 3,
      },
    ],
    key: '1',
  },
  {
    title: '球队列强',
    content: [
      {
        label: '俄罗斯',
        value: 21,
        index: 1,
      },
      {
        label: '沙特',
        value: 22,
        index: 2,
      },
      {
        label: '阿拉伯',
        value: 23,
        index: 1,
      },
      {
        label: '埃及',
        value: 24,
        index: 2,
      },
      {
        label: '俄罗斯',
        value: 25,
        index: 1,
      },
      {
        label: '乌拉圭',
        value: 26,
        index: 2,
      },
      {
        label: '葡萄牙',
        value: 27,
        index: 1,
      },
      {
        label: '西班牙',
        value: 28,
        index: 2,
      },
      {
        label: '摩洛哥',
        value: 29,
        index: 1,
      },
      {
        label: '伊朗法国',
        value: 30,
        index: 2,
      },
      {
        label: '澳大利亚',
        value: 31,
        index: 1,
      },
      {
        label: '秘鲁',
        value: 32,
        index: 2,
      },
      {
        label: '丹麦',
        value: 33,
        index: 2,
      },
      {
        label: '阿根廷',
        value: 34,
        index: 1,
      },
      {
        label: '冰岛',
        value: 35,
        index: 2,
      },
      {
        label: '克罗地亚',
        value: 36,
        index: 1,
      },
      {
        label: '尼日利亚',
        value: 37,
        index: 2,
      },
      {
        label: '巴西瑞士',
        value: 38,
        index: 1,
      },
      {
        label: '哥斯达黎',
        value: 39,
        index: 2,
      },
      {
        label: '加塞尔维亚',
        value: 40,
        index: 2,
      },
    ],
    key: '2',
  },
  {
    title: '赛程分组',
    content: [
      {
        label: 'A组',
        value: 301,
        index: 1,
      },
      {
        label: 'B组',
        value: 302,
        index: 2,
      },
      {
        label: 'C组',
        value: 303,
        index: 3,
      },
      {
        label: 'D组',
        value: 304,
        index: 4,
      },
      {
        label: 'E组',
        value: 305,
        index: 1,
      },
      {
        label: 'F组',
        value: 306,
        index: 2,
      },
      {
        label: 'G组',
        value: 307,
        index: 3,
      },
      {
        label: 'H组',
        value: 308,
        index: 4,
      },
      {
        label: '1/8决赛',
        value: 309,
        index: 1,
      },
      {
        label: '1/4决赛',
        value: 310,
        index: 2,
      },
      {
        label: '半决赛',
        value: 311,
        index: 3,
      },
      {
        label: '决赛',
        value: 312,
        index: 4,
      },
    ],
    key: '3',
  },
  {
    title: '热门球星',
    content: [
      {
        label: '梅西',
        value: 431,
        index: 1,
      },
      {
        label: 'C罗',
        value: 432,
        index: 2,
      },
      {
        label: '内马尔',
        value: 433,
        index: 3,
      },
      {
        label: '苏亚雷斯',
        value: 434,
        index: 4,
      },
      {
        label: '卡瓦尼',
        value: 431,
        index: 1,
      },
      {
        label: '穆勒',
        value: 435,
        index: 2,
      },
      {
        label: '克罗斯',
        value: 436,
        index: 3,
      },
      {
        label: '德赫亚',
        value: 437,
        index: 4,
      },
      {
        label: '阿扎尔',
        value: 438,
        index: 3,
      },
      {
        label: '博格巴',
        value: 439,
        index: 4,
      },
    ],
    key: '4',
  },
  {
    title: '独家内容',
    content: [
      {
        label: '官方肖像',
        value: 501,
        index: 1,
      },
      {
        label: '更衣室探秘',
        value: 502,
        index: 1,
      },
      {
        label: '策划盘点',
        value: 503,
        index: 1,
      },
    ],
    key: '5',
  },
  {
    title: '精选锦集',
    content: [
      {
        label: '进球集锦',
        value: 601,
        index: 1,
      },
      {
        label: '单场精选',
        value: 602,
        index: 1,
      },
      {
        label: '每日精选',
        value: 603,
        index: 1,
      },
    ],
    key: '6',
  },
  {
    title: '花絮趣闻',
    content: [
      {
        label: '太太团',
        value: 701,
        index: 1,
      },
    ],
    key: '7',
  },
  {
    title: '特殊素材',
    content: [
      {
        label: '图片素材',
        value: 801,
        index: 1,
      },
    ],
    key: '8',
  },
  {
    title: '资源分区',
    content: [
      {
        label: 'Getty/FIFA',
        value: 901,
        index: 1,
      },
      {
        label: '路透社',
        value: 902,
        index: 1,
      },
      {
        label: '法新社',
        value: 903,
        index: 1,
      },
      {
        label: '塔斯社/俄新社',
        value: 904,
        index: 1,
      },
    ],
    key: '9',
  },
];

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      openKeys: ['sub1'],
      navUpdateModalVisible: false,
      navUpdateModalType: '1', // 1 一级导航， 2， 二级导航
    };
  }

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  showNavUpdateModal = navUpdateModalType => {
    this.setState({ navUpdateModalType, navUpdateModalVisible: true });
  };

  closeNavUpdateModal = data => {
    this.setState({ navUpdateModalVisible: false });
  };

  handleClick = item => {
    const { key, domEvent } = item;
    domEvent.stopPropagation();
    if (key === 'add') {
      this.showNavUpdateModal('1');
    } else if (/addSub/.test(key)) {
      this.showNavUpdateModal('2');
    }
    console.log(item, key, domEvent.target);
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

  render() {
    const { navUpdateModalVisible, navUpdateModalType } = this.state;

    return (
      <div className={s.root}>
        <NavUpdateModal
          navType={navUpdateModalType}
          visible={navUpdateModalVisible}
          onClose={this.closeNavUpdateModal}
        />
        <Menu
          onClick={this.handleClick}
          mode="vertical"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          selectable={false}
        >
          {nav.map((n, i) => (
            <SubMenu
              className={s.subMenu}
              key={n.key + i}
              title={
                <span
                  onDoubleClick={() => {
                    this.showNavUpdateModal('1', n);
                  }}
                >
                  {' '}
                  {n.title}{' '}
                  <Icon
                    type="cross"
                    onClick={() => {
                      this.remove('1', n);
                    }}
                  />{' '}
                </span>
              }
            >
              {n.content.map((c, j) => (
                <Menu.Item key={c.value + j}>
                  <span
                    onDoubleClick={() => {
                      this.showNavUpdateModal('2', c);
                    }}
                  >
                    {c.label}{' '}
                    <Icon
                      type="cross"
                      onClick={() => {
                        this.remove('2', c);
                      }}
                    />
                  </span>
                </Menu.Item>
              ))}
              <Menu.Item key={`addSub${n.key}`} style={{ color: '#f00' }}>
                添加
                <Icon type="plus" />
              </Menu.Item>
            </SubMenu>
          ))}
          <Menu.Item key="add" style={{ color: '#f00' }}>
            添加
            <Icon type="plus" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withStyles(s)(SideNav);
