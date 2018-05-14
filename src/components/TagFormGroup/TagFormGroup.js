import React from 'react';
import PropTypes from 'prop-types';
import {Select, Button} from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TagFormGroup.less';

const Option = Select.Option;

const children = [];

const inputs = [
  {
    key: 'all',
    label: '包含全部关键词'
  }, {
    key: 'contain',
    label: '包含任意一个关键词'
  }, {
    key: 'exclude',
    label: '不包含关键词'
  }
]

class TagFormGroup extends React.Component {
  state = {
    showAll: false,
    optionsMap: {}
  }

  handlerClick = (e) => {
    let showAll = !this.state.showAll
    this.setState({showAll})
  }

  render() {
    let {showAll, optionsMap} = this.state;

    let Inputs = inputs.map((item, index) => (
      <div className={s.item} key={item.key}>
        <label className={s.label}>{item.label}</label>
        <div className={s.control}>
          <Select
            mode="tags"
            placeholder="请输入关键词"
            dropdownStyle={{
            display: 'none'
          }}>
            {optionsMap[item.key]}
          </Select>
        </div>
      </div>
    ));

    return (
      <div className={s.root}>
        {showAll
          ? Inputs
          : Inputs[0]}
        <div className={s.btn}>
          <Button
            icon={showAll
            ? 'up'
            : 'down'}
            onClick={this.handlerClick}/></div>
      </div>
    );
  }
}

export default withStyles(s)(TagFormGroup);
