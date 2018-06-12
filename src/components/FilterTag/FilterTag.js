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

const { CheckableTag } = Tag;
const FormItem = Form.Item;
// const confirm = Modal.confirm;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const FormModal = Form.create()(
  class extends React.Component {
    handleSubmit = () => {
      const { form, onOk } = this.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        form.resetFields();
        onOk(values);
      });
    };

    render() {
      const { visible, onCancel, form, tagTitle, formAfter } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          width={800}
          visible={visible}
          title={'添加' + tagTitle}
          okText="确认"
          cancelText="取消"
          onCancel={onCancel}
          onOk={this.handleSubmit}
        >
          <Form>
            <FormItem {...formItemLayout} label={tagTitle + '名称'}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入名称',
                  },
                ],
              })(<Input placeholder="请输入名称" />)}
            </FormItem>
            {formAfter || formAfter}
          </Form>
        </Modal>
      );
    }
  },
);

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

    console.log(activeKey);

    return (
      <div className={s.root} style={style || null}>
        <FormModal
          visible={modalVisible}
          onCancel={this.hideModal}
          onOk={this.createTag}
          tagTitle={title}
          formAfter={formAfter}
        />
        <div className={s.list}>
          {tags.map(tag => (
            <CheckableTag
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
