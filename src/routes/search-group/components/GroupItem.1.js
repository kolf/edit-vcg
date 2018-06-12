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
let tagGroupRef = null;

class GroupItem extends React.PureComponent {
  state = {
    tagGroupModalVisible: false,
  };

  handleAddTag = e => {
    e.stopPropagation();
    this.setState({
      tagGroupModalVisible: true,
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

    const { tagGroupModalVisible } = this.state;

    return (
      <div
        className={s.root + (selected ? ' ' + s.active : '')}
        onClick={onClick}
      >
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
                <Button icon="plus-circle" onClick={this.handleAddTag}>
                  一级筛选项
                </Button>
              </span>
            </div>
            <div className={s.connect}>
              <TagGroup
                groupId={id}
                closable={true}
                items={searchItems}
                modalVisible={tagGroupModalVisible}
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
