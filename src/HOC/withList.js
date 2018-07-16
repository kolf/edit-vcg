import React from 'react';
import { Spin } from 'antd';

function EmptyData({ error }) {
  return <div className="noDataBox">{error || '（≧﹏ ≦）暂无数据!'}</div>;
}

const withList = ItemComponent => {
  return class List extends React.Component {
    handleClick = (item, e) => {
      const { onClick } = this.props;
      onClick && onClick(item);
    };

    render() {
      const { items, error, isLoading, placeholder, className } = this.props;
      if (isLoading) {
        return (
          <Spin tip="加载中...">
            <div className="loadingBox" />
          </Spin>
        );
      } else if (!items && placeholder) {
        return <div className="loadingBox">{placeholder}</div>;
      } else if (items.length === 0) {
        return <div className="loadingBox">（≧﹏ ≦）暂无数据!</div>;
      }
      return (
        <div className={className}>
          {items.map(item => (
            <ItemComponent onClick={e => this.handleClick(item, e)} {...item} />
          ))}
        </div>
      );
    }
  };
};

export default withList;
