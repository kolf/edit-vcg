import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Button, Tag, Icon, Modal } from 'antd';
import SearchGroupModal from './SearchGroupModal';
import { deleteSearch } from 'actions/searchGroups';
import TagGroup from './TagGroup';
// import modal from 'components/modal';
import s from './GroupItem.css';

const confirm = Modal.confirm;

class GroupItem extends React.Component {
  state = {
    searchGroupModalVisible: false,
  };

  searchLevel = 1;
  groupSearch = null;
  parentId = '';

  handleTagClick = (groupSearch, level, parentId = '') => {
    this.searchLevel = level;
    this.groupSearch = groupSearch;
    this.parentId = parentId;

    this.setState({
      searchGroupModalVisible: true,
    });
  };

  cancelSearchGroupModal = () => {
    this.setState({
      searchGroupModalVisible: false,
    });
  };

  oKSearchGroupModal = () => {
    this.setState({
      searchGroupModalVisible: false,
    });
  };

  onDeleteTag = tag => {
    const onOk = () => {
      const { dispatch, groupId } = this.props;
      // console.log(dispatch);
      dispatch(deleteSearch(tag, groupId));
    };

    confirm({
      title: `删除此筛选项`,
      content: '删除一级筛选后，二级筛选项也会被删除',
      okText: '确认删除',
      cancelText: '我再想想',
      onOk,
    });
  };

  render() {
    const {
      oss176,
      title,
      tags,
      id,
      searchItems,
      index,
      onDelete,
      selected,
      onClick,
    } = this.props;
    const { searchGroupModalVisible } = this.state;

    return (
      <div
        className={s.root + (selected ? ' ' + s.active : '')}
        onClick={onClick}
      >
        <SearchGroupModal
          visible={searchGroupModalVisible}
          onCancel={this.cancelSearchGroupModal}
          onOk={this.oKSearchGroupModal}
          level={this.searchLevel}
          parentId={this.parentId}
          value={this.groupSearch}
          groupId={id}
        />
        <Row gutter={16}>
          <Col span={4}>
            <div className={s.img}>
              <img src={oss176} />
            </div>
          </Col>
          <Col span={20}>
            <div className={s.heading}>
              <p className={s.title} title={title}>
                <span className={s.marginRight20}>组照ID: {id}</span>
                <span>组照标题: {title}</span>
              </p>
              <span className={s.btns}>
                <Button
                  icon="plus-circle"
                  onClick={e => this.handleTagClick(null, 1)}
                >
                  一级筛选项
                </Button>
              </span>
            </div>
            <div className={s.connect}>
              <TagGroup
                items={searchItems}
                onClick={this.handleTagClick}
                onClose={this.onDeleteTag}
              />
            </div>
          </Col>
        </Row>
        <Button
          className={s.delete}
          size="small"
          type="primary"
          icon="cross"
          onClick={onDelete}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isUpdating: state.searchGroups.isGroupUpdating,
  };
}

export default withStyles(s)(connect(mapStateToProps)(GroupItem));
