import React, { Component } from 'react';
import { DatePicker } from 'antd';
import RadioTag from 'components/RadioTag';
import moment from 'moment';

const { RangePicker } = DatePicker;

const options = [
  {
    label: '全部',
    value: 'all',
  },
  {
    label: '今日',
    value: '1',
  },
  {
    label: '昨天',
    value: '2',
  },
  {
    label: '近一周',
    value: '3',
  },
];

function strValueToMomentValue(str) {
  return str.split(',').map(d => moment(d));
}

class TimeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      timeValue: [],
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { value, timeValue } = this.state;

    console.log(nextProps, nextState)

    if (nextProps.value.length > 10) {
      this.setState({
        timeValue: strValueToMomentValue(nextProps.value),
        value: '',
      });
    } else if (nextProps.value != value) {
      this.setState({
        value: nextProps.value,
        timeValue: [],
      });
    }
  }

  handleChange = e => {
    const { value } = this.state;
    const { onChange } = this.props;
    const newVal = e.target ? e.target.value : e;

    onChange(newVal);
  };

  render() {
    const { onChange } = this.props;
    const { value, timeValue } = this.state;

    console.log(value, timeValue);

    return (
      <span className="">
        <RadioTag
          value={value}
          onChange={this.handleChange}
          options={options}
        />
        <RangePicker
          format="YYYY-MM-DD"
          value={timeValue}
          style={{ width: 220 }}
          placeholder={['开始时间', '结束时间']}
          onChange={this.handleChange}
        />
      </span>
    );
  }
}

export default TimeGroup;
