import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Tabs, Tag, Icon, Button, Modal, Spin } from 'antd';
import NavModal from './NavModal';
import NavsGroup from './NavsGroup';
import s from './MainNav.less';
import { fetchTopicNavs } from 'actions/topicNavs';

const TabPane = Tabs.TabPane;
const NAVLOCATION = '0';

class MainNav extends React.Component {
  static defaultProps = {
    navs: [],
    isFetching: true,
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
    const { navs, topicId, isFetching } = this.props;

    if (navs.length === 0) {
      return null;
    }

    return (
      <div className={s.root}>
        <Spin spinning={isFetching}>
          <Tabs animated={false}>
            {navs.map(nav => (
              <TabPane tab={nav.navName} key={nav.navId}>
                <NavsGroup items={nav.children} />
              </TabPane>
            ))}
          </Tabs>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.topicNavs[NAVLOCATION].isFetching,
    navs: state.topicNavs[NAVLOCATION].tree,
  };
}

export default connect(mapStateToProps)(withStyles(s)(MainNav));
