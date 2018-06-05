import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Spin, Modal, message } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import SearchInput from 'components/SearchInput';
import FilterTag from 'components/FilterTag';
import GroupItem from './components/GroupItem';

import s from './GroupTags.css';

import { fetchGroups } from 'actions/groups';
import GroupTagsModal from './components/GroupTagsModal';
import TagModal from './components/TagModal';

const confirm = Modal.confirm;

class GroupTags extends React.Component {
  static propTypes = {
    items: PropTypes.array,
  };

  static defaultProps = {
    items: [],
  };

  state = {
    query: {
      assetFamily: 1,
      desc: 1,
      keywordType: 0,
      pageSize: 100,
      resGroup: 1,
    },
    groupTagsModalVisible: false,
    tagModalVisible: false,
  };

  componentDidMount() {
    this.loadGroups({});
  }

  loadGroups = param => {
    const { dispatch } = this.props;
    const { query } = this.state;

    dispatch(
      fetchGroups({
        ...query,
        ...param,
      }),
    );
  };

  cancelGroupTagsModal = () => {
    this.setState({
      groupTagsModalVisible: false,
    });
  };

  oKGroupTagsModal = () => {
    this.setState({
      groupTagsModalVisible: false,
    });
  };

  onDeleteTag = ({ id }) => {
    const onOk = () => {
      const { dispatch } = this.props;
      console.log(dispatch);
    };

    confirm({
      title: `删除此筛选项`,
      content: '删除一级筛选后，二级筛选项也会被删除',
      okText: '确认删除',
      cancelText: '我再想想',
      onOk,
    });
  };

  pushlishGroupTags = () => {
    message.success('发布成功！');
  };

  handleTagClick = () => {
    this.setState({
      groupTagsModalVisible: true,
    });
  };

  handleFilterTagClick = () => {
    console.log('errrrrrrr');
    this.setState({
      tagModalVisible: true,
    });
  };

  hideTagModal = () => {
    this.setState({
      tagModalVisible: false
    })
  }

  render() {
    const { items } = this.props;
    let { query, groupTagsModalVisible, tagModalVisible } = this.state;

    return (
      <div className={s.root}>
        <GroupTagsModal
          visible={groupTagsModalVisible}
          onCancel={this.cancelGroupTagsModal}
          onOk={this.oKGroupTagsModal}
        />
        <TagModal visible={tagModalVisible} onCancel={this.hideTagModal}/>

        <SearchInput
          style={{ width: 800 }}
          placeholder="输入专题名称或ID进行搜索"
          onClick={values => {
            this.loadGroups({
              keyword: values.value,
            });
          }}
        />

        <div className={s.filterTagWrap}>
          <FilterTag title="模版" onClick={this.handleFilterTagClick} />
        </div>

        <div className={s.padB8}>
          <Button type="primary" onClick={this.pushlishGroupTags}>
            批量发布
          </Button>
        </div>

        {items.length > 0 ? (
          <div className={s.list}>
            {items.map(item => (
              <GroupItem
                onClick={this.handleTagClick}
                onClose={this.onDeleteTag}
                {...item}
              />
            ))}
          </div>
        ) : (
          <div className={s.loading}>
            <Spin />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.groups.list,
    isFetching: state.groups.isFetching,
  };
}

export default withStyles(s)(connect(mapStateToProps)(GroupTags));
