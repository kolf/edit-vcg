import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchKeywordDict } from 'actions/keywordDict';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Modal, Table, Spin } from 'antd';

class KeywordUpdateModal extends React.Component {
  static propsTypes = {
    isFetching: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
  };

  state = {
    selectedRowKeys: [],
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visible === true &&
      this.props.visible === false &&
      nextProps.keywordIds
    ) {
      this.getKeywords(nextProps.keywordIds);
      this.selectedRowKeys = [];
    }
  }

  getKeywords = ids => {
    this.props.dispatch(
      fetchKeywordDict({
        data: ids,
      }),
    );
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys });
  };

  onRowClick = (record, index) => {
    const { onChange, multiple, data } = this.props;
    let { selectedRowKeys } = this.state;
    const { id, displayName } = record;
    const selectIndex = selectedRowKeys.indexOf(id);

    if (!multiple) {
      onChange &&
        onChange([
          {
            value: id,
            label: displayName,
          },
        ]);
      return false;
    }

    if (selectIndex >= 0) {
      //找到了
      selectedRowKeys.splice(selectIndex, 1);
    } else {
      selectedRowKeys.push(id);
    }

    this.setState({
      selectedRowKeys,
    });
  };

  onOk = () => {
    const { data, onChange } = this.props;
    const { selectedRowKeys } = this.state;

    const value = selectedRowKeys.map(key => {
      const { id, displayName } = data.find(item => item.id === key);
      return {
        value: id + '',
        label: displayName,
      };
    });

    onChange && onChange(value);
  };

  render() {
    const { visible, onCancel, data, isFetching, multiple } = this.props;
    const { selectedRowKeys } = this.state;

    let props = {
      width: 840,
      title: '选择多义词',
      visible,
      okText: '提交',
      cancelText: '取消',
      onCancel,
      onOk: this.onOk,
      destroyOnClose: true,
    };

    if (!multiple) {
      props.footer = null;
    }

    return (
      <Modal {...props}>
        <Spin tip="加载中..." spinning={isFetching}>
          <Table
            size="small"
            rowKey="id"
            pagination={false}
            columns={columns}
            dataSource={data}
            onRowClick={this.onRowClick}
            rowSelection={
              multiple
                ? {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                  }
                : null
            }
          />
        </Spin>
      </Modal>
    );
  }
}

function mapState(state, props) {
  const ids = props.keywordIds.match(/\d+/g) || [];
  return {
    data: ids.map(id => state.keywordDict.mapData[id]),
    isFetching: state.keywordDict.isFetching,
  };
}

export default connect(mapState)(KeywordUpdateModal);
