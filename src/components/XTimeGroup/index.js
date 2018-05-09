import React, { Component } from 'react';
import { Radio, Icon, DatePicker } from 'antd';

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import './style.scss';

class XTimeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      timeValue: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, timeValue } = this.state;

    // //console.log(typeof nextProps.value)

    if (Array.isArray(nextProps.value)) {
      this.setState({
        timeValue: nextProps.value,
        value: '',
      });
    } else if (nextProps.value != value) {
      this.setState({
        value: nextProps.value,
        timeValue: [],
      });
    }
  }

  onChange = e => {
    const { value } = this.state;
    const { onChange } = this.props;
    const newVal = e.target ? e.target.value : e;
    // if(newVal==value){
    //     newVal = ''
    // }
    // console.log(value);
    // console.log(newVal)

    onChange(newVal);
  };

  render() {
    const { onChange } = this.props;
    const { value, timeValue } = this.state;

    return (
      <span className="">
        <RadioGroup className="border-0" onChange={this.onChange} value={value}>
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="1">今日</RadioButton>
          <RadioButton value="2">昨天</RadioButton>
          <RadioButton value="3">近一周</RadioButton>
        </RadioGroup>
        <RangePicker
          format="YYYY-MM-DD"
          value={timeValue}
          style={{ width: 220 }}
          placeholder={['开始时间', '结束时间']}
          onChange={this.onChange}
        />
      </span>
    );
  }
}

export default XTimeGroup;
