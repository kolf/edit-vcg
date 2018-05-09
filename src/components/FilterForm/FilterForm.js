import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Form, DatePicker, TimePicker, Button, Input, Radio } from 'antd';
import XTimeGroup from 'components/XTimeGroup';
import FilterRss from './FilterRss';
import s from './FilterForm.less';
import filterData from './filterData';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};

function control(formItem) {
  const { formType, options, placeholder } = formItem;
  switch (formType) {
    case 'radio':
      return (
        <RadioGroup className="border-0">
          {options.map(option => (
            <RadioButton value={option.value} key={option.value}>
              {option.label}
            </RadioButton>
          ))}
        </RadioGroup>
      );
    case 'radioTime':
      return <XTimeGroup />;
    default:
      return <Input placeholder={placeholder} style={{ width: 360 }} />;
  }
}

class FilterForm extends React.Component {
  static propTypes = {
    formItems: PropTypes.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };

    this.handlerClickExpend = this.handlerClickExpend.bind(this);
  }

  handlerClickExpend() {
    const expand = !this.state.expand;
    this.setState({
      expand,
    });
  }

  clickTag = () => {
    console.log();
  };

  render() {
    const { formItems, form } = this.props;
    const { getFieldDecorator } = form;
    const { expand } = this.state;

    return (
      <React.Fragment>
        <div className={s.tools}>
          <FilterRss form={form} onTag={this.clickTag} />
          <Button
            icon={expand ? 'up' : 'down'}
            onClick={this.handlerClickExpend}
          >
            展开筛选
          </Button>
        </div>
        <Form className={s.wrap} style={{ display: expand ? 'block' : 'none' }}>
          {formItems.map(formItem => (
            <FormItem
              {...formItemLayout}
              className={s.item}
              label={formItem.label}
            >
              {getFieldDecorator(formItem.field)(control(formItem))}
            </FormItem>
          ))}
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(withStyles(s)(FilterForm));
