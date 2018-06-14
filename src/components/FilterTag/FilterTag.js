import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button, Modal, Input, message, Tag, Icon, Form, Divider } from 'antd';
import {
  fetchUserSearch,
  createUserSearch,
  deleteUserSearch,
} from 'actions/userSearch';
import s from './FilterTag.less';
import AddTagModal from './AddTagModal';

const { CheckableTag } = Tag;

class FilterTag extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '订阅',
  };

  state = {
    modalVisible: false,
    activeKey: '',
  };

  componentDidMount() {
    this.fetchTags();
  }

  fetchTags = () => {
    const { pageId, dispatch } = this.props;
    dispatch(fetchUserSearch(pageId));
  };

  createTag = ({ name }) => {
    const { value, dispatch, pageId } = this.props;

    dispatch(
      createUserSearch({
        type: pageId,
        name,
        searchs: JSON.stringify(value),
      }),
    ).then(msg => {
      this.fetchTags();
      this.hideModal();
    });
  };

  handleClick = tag => {
    const { onClick } = this.props;
    this.setState({
      activeKey: tag.key,
    });
    onClick && onClick(tag.value);
  };

  handleClose = (key, e) => {
    e.stopPropagation();
    const { pageId, dispatch } = this.props;
    const onOk = () => {
      dispatch(
        deleteUserSearch({
          type: pageId,
          id: key,
        }),
      ).then(msg => {
        this.fetchTags();
        this.hideModal();
      });
    };

    const { title } = this.props;
    Modal.confirm({
      title: `删除${title}`,
      content: `删除${title}后需要重新添加`,
      okText: '确定',
      cancelText: '取消',
      onOk,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleAddClick = () => {
    const { value, title, formAfter } = this.props;

    if (!value && !formAfter) {
      message.info(`请选择一个${title}`);
      return;
    }

    this.setState({
      modalVisible: true,
    });
  };

  render() {
    const { style, title, tags, formAfter } = this.props;
    const { modalVisible, activeKey } = this.state;

    return (
      <div className={s.root} style={style || null}>
        <AddTagModal
          visible={modalVisible}
          onCancel={this.hideModal}
          onOk={this.createTag}
          tagTitle={title}
          formAfter={formAfter}
        />
        <div className={s.list}>
          {tags.map(tag => (
            <CheckableTag
              title={tag.name}
              key={tag.id}
              onChange={() => {
                this.handleClick(tag);
              }}
              checked={tag.key === activeKey}
            >
              {tag.name}
              <Icon type="cross" onClick={e => this.handleClose(tag.key, e)} />
            </CheckableTag>
          ))}
        </div>
        <div className={s.btn}>
          <Button
            size="small"
            type="primary"
            icon="plus-circle"
            onClick={this.handleAddClick}
          >
            {title}
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tags: state.userSearch.list,
    isFetching: state.userSearch.isFetching,
    errMessage: state.userSearch.errMessage,
  };
}

export default withStyles(s)(connect(mapStateToProps)(FilterTag));
