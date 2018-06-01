import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tag, Icon, Button, Modal } from 'antd';
import NavModal from './NavModal';
import s from './MainNav.less';
import { fetchTopicNavs } from 'actions/topicNavs';

const TabPane = Tabs.TabPane;
const NAVLOCATION = '0';

function hasThreeLevel(navs = []) {
  return (
    navs.length === 1 || navs.some(t => t.children && t.children.length > 0)
  );
}

const Navs = ({ items = [] }) =>
  items.map(item => <Tag key={item.navId}>{item.navName}</Tag>);

const NavsGroup = ({ items = [], onClick, onClose }) => {
  return items.map(item => (
    <div className={`${s.item} ant-row ant-form-item`}>
      <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-3">
        <Tag key={item.navId}>{item.navName}</Tag>
      </div>
      <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-21">
        <div className="ant-form-item-control">
          <Navs items={item.children} />
        </div>
      </div>
    </div>
  ));
};

class MainNav extends React.Component {
  static defaultProps = {
    navs: [],
  };

  componentDidMount() {
    this.fetchTopicNavs();
  }
  fetchTopicNavs = () => {
    this.props.dispatch(
      fetchTopicNavs({ topicId: this.props.topicId, navLocation: NAVLOCATION }),
    );
  };

  render() {
    let { navs, topicId } = this.props;

    if (navs.length === 0) {
      return null;
    }

    return (
      <div className={s.root}>
        <Tabs animated={false}>
          {navs.map(nav => (
            <TabPane tab={nav.navName} key={nav.navId}>
              {hasThreeLevel(nav.children) ? (
                <NavsGroup items={nav.children} />
              ) : (
                <div className={s.item}>
                  <Navs items={nav.children} />
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topicNavs.isFetching,
    navs: state.topicNavs.navs[0],
  };
}

export default connect(mapStateToProps)(withStyles(s)(MainNav));
