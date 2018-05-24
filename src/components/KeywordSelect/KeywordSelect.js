import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Select } from 'antd';
import classNames from 'classnames';
import s from './KeywordSelect.less';
import KeywordTag from './KeywordTag';

const Option = Select.Option;

function Input({ value, onChange }) {
  return <input placeholder="请输入关键词回车后确定" className="ant-input" />;
}

class KeywordSelect extends Component {
  state = {
    editable: false,
  };

  render() {
    const { editable } = this.state;

    return (
      <span className={s.root}>
        {editable ? <Input /> : <KeywordTag value={[]} />}
      </span>
    );
  }
}

export default withStyles(s)(KeywordSelect);
