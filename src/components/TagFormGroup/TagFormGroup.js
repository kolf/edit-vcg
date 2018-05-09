import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TagFormGroup.less';

const Option = Select.Option;

const children = [];

class TagFormGroup extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={s.root}>
          <div className={s.item}>
            <label className={s.label}>包含全部关键词</label>
            <div className={s.control}>
              <Select
                mode="tags"
                placeholder="请输入关键词"
                dropdownStyle={{ display: 'none' }}
              >
                {children}
              </Select>
            </div>
          </div>
          <div className={s.item}>
            <label className={s.label}>包含任意一个关键词</label>
            <div className={s.control}>
              <Select
                mode="tags"
                placeholder="请输入关键词"
                dropdownStyle={{ display: 'none' }}
              >
                {children}
              </Select>
            </div>
          </div>
          <div className={s.item}>
            <label className={s.label}>不包含关键词</label>
            <div className={s.control}>
              <Select
                mode="tags"
                placeholder="请输入关键词"
                dropdownStyle={{ display: 'none' }}
              >
                {children}
              </Select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(s)(TagFormGroup);
