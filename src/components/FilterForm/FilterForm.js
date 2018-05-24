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

function Radios({ onChange, value, options }) {
  function handleChange(e) {
    console.log(e)
    onChange(e.target.value)
  }

  return <RadioGroup className="border-0" onChange={handleChange}>
    {options.map(option => (
      <RadioButton value={option.value} key={option.value}>
        {option.label}
      </RadioButton>
    ))}
  </RadioGroup>
}

class FilterForm extends React.Component {
  static propTypes = {
    formItems: PropTypes.array,
    onClick: PropTypes.func.isRequire
  };

  static defaultProps = {
    onChange: () => { }
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };

  }

  handleClickExpend = () => {
    const expand = !this.state.expand;
    this.setState({
      expand,
    });
  }

  handleClickTag = () => {
    console.log();
  };

  handleChange = (field, value) => {
    const { onClick, form } = this.props;
    const values = form.getFieldsValue();
    onClick({field, value});
  }

  render() {
    const { formItems, form } = this.props;
    const { getFieldDecorator } = form;
    const { expand } = this.state;

    return (
      <React.Fragment>
        <div className={s.tools}>
          <FilterRss form={form} onTag={this.handleClickTag} />
          <Button
            icon={expand ? 'up' : 'down'}
            onClick={this.handleClickExpend}
          >
            展开筛选
          </Button>
        </div>
        <Form className={s.wrap} style={{ display: expand ? 'block' : 'none' }}>
          {formItems.map((formItem, index) => {
            const { formType, options, placeholder } = formItem;
            let control = null;
            switch (formType) {
              case 'radio':
                control = <Radios options={options} />
                break;
              case 'radioTime':
                control = <XTimeGroup />
                break;
              default:
                control = <Input placeholder={placeholder} style={{ width: 360 }} />
            }

            return <FormItem
              key={s + index}
              {...formItemLayout}
              className={s.item}
              label={formItem.label}
            >
              {getFieldDecorator(formItem.field, {
                onChange: value => this.handleChange(formItem.field, value)
              })(control)}
            </FormItem>
          })}
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(withStyles(s)(FilterForm));
