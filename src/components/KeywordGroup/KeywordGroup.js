import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Form } from 'antd';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import KeywordTag from 'components/KeywordTag';
import s from './KeywordGroup.less';

const Option = Select.Option;
const FormItem = Form.Item;

const inputs = [
  {
    key: 'allContainKeywords',
    label: '包含全部关键词',
  },
  {
    key: 'anyContainKeywords',
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

class KeywordGroup extends React.Component {
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
    value: this.props.value || {
      allContainKeywords: [],
      anyContainKeywords: [],
      notContainKeywords: [],
    },
  };

  handlerClick = e => {
    let showAll = !this.state.showAll;
    this.setState({ showAll });
  };

  handleChange = (key, value) => {
    const { onChange } = this.props;
    let values = this.getValues();

    values[key] = value || [];
    if (this.props.value === undefined) {
      this.setState({
        value: values,
      });
    }
    console.log(values);

    onChange && onChange(values);
  };

  getValues = () =>
    this.props.value !== undefined ? this.props.value : this.state.value;

  render() {
    let { showAll, options } = this.state;
    let values = this.getValues();

    let Inputs = inputs.map(({ label, key }) => {
      return (
        <FormItem
          className={s.control}
          key={key}
          label={label}
          {...this.props.formItemLayout}
        >
          <KeywordTag
            value={values[key]}
            onChange={this.handleChange.bind(this, key)}
          />
        </FormItem>
      );
    });

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

export default withStyles(s)(KeywordGroup);
