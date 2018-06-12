import React from 'react';
import { connect } from 'react-redux';
import { Tag, Icon, Modal } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { deleteSearch } from 'actions/searchGroups';
import SearchGroupModal from './SearchGroupModal';

import s from './TagGroup.css';

const confirm = Modal.confirm;

const Placeholder = ({ text }) => <div className={s.placeholder}>{text}</div>;

class TagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  searchLevel = 1;
  groupSearch = null;
  parentId = '';

  handleClick = (groupSearch, level, parentId = '', e) => {
    e.stopPropagation();
    const { closable } = this.props;
    if (!closable) {
      return;
    }
    this.searchLevel = level;
    this.groupSearch = groupSearch;
    this.parentId = parentId;

    this.setState({
      modalVisible: true,
    });
  };

  handleClose = (tag, e) => {
    e.stopPropagation();
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

  cancelSearchGroupModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  oKSearchGroupModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    const { items, closable, groupId, placeholder } = this.props;
    const { modalVisible } = this.state;

    return (
      <div className={s.root}>
        <SearchGroupModal
          visible={modalVisible}
          onCancel={this.cancelSearchGroupModal}
          onOk={this.oKSearchGroupModal}
          level={this.searchLevel}
          parentId={this.parentId}
          value={this.groupSearch}
          groupId={groupId}
        />
        {items.length > 0 ? (
          items.map(item => (
            <div className="ant-row ant-form-item">
              <div className="ant-form-item-label ant-col-xs-24 ant-col-sm-3">
                <Tag
                  key={item.id}
                  color="#333"
                  onClick={e => this.handleClick(item, 1, '', e)}
                >
                  {item.name}
                  {closable && (
                    <Icon
                      type="cross"
                      onClick={e => this.handleClose(item, e)}
                    />
                  )}
                </Tag>
              </div>
              <div className="ant-form-item-control-wrapper  ant-col-xs-24 ant-col-sm-21">
                <div className="ant-form-item-control">
                  {item.children &&
                    item.children.map(t => (
                      <Tag
                        key={t.id}
                        onClick={e => this.handleClick(item, 2, item.id, e)}
                      >
                        {t.name}
                        {closable && (
                          <Icon
                            type="cross"
                            onClick={e => this.handleClose(t, e)}
                          />
                        )}
                      </Tag>
                    ))}
                  {closable && (
                    <Tag
                      key="cross"
                      onClick={e => this.handleClick(null, 2, item.id, e)}
                    >
                      <Icon type="plus-circle" /> 二级筛选项
                    </Tag>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Placeholder text={placeholder} />
        )}
      </div>
    );
  }
}

export default withStyles(s)(connect()(TagGroup));
