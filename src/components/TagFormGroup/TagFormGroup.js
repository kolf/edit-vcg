import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Form } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TagFormGroup.less';

const Option = Select.Option;
const FormItem = Form.Item;

const inputs = [
  {
    key: 'allKeywords',
    label: '包含全部关键词',
  },
  {
    key: 'anyOneKeywords',
    label: '包含任意一个关键词',
  },
  {
    key: 'notContainKeywords',
    label: '不包含关键词',
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class TagFormGroup extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    formItemLayout,
  };

  state = {
    showAll: false,
    options: {},
    value: this.props.value || [],
  };

  handlerClick = e => {
    let showAll = !this.state.showAll;
    this.setState({ showAll });
  };

  handlerChange = (index, value) => {
    let values = this.props.value || this.state.value;
    values[index] = value;
    if (this.props.value) {
      if (values.every(v => v.length === 0)) {
        values = [];
      }
      this.props.onChange(values);
    } else {
      this.setState({
        value: values,
      });
    }
  };

  render() {
    let { showAll, options, value } = this.state;
    let values = this.props.value || value;

    console.log(values);

    let Inputs = inputs.map((item, index) => (
      <FormItem key={index} label={item.label} {...this.props.formItemLayout}>
        <Select
          value={values[index]}
          mode="tags"
          placeholder="请输入关键词"
          dropdownStyle={{
            display: 'none',
          }}
          onChange={this.handlerChange.bind(this, index)}
        >
          {options[item.key]}
        </Select>
      </FormItem>
    ));

    return (
      <div className={s.root}>
        {showAll ? Inputs : Inputs[0]}
        <div className={s.btn}>
          <Button icon={showAll ? 'up' : 'down'} onClick={this.handlerClick} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TagFormGroup);
