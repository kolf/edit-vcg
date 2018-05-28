import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Form, Button, Input } from 'antd';
import TimeGroup from 'components/TimeGroup';
import RadioTag from 'components/RadioTag';
import SearchSelect from 'components/SearchSelect';
import FilterRss from './FilterRss';
import s from './FilterForm.less';

const FormItem = Form.Item;

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

const emptyValue = '';

class FilterForm extends React.Component {
  static propTypes = {
    formItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.object,
  };

  static defaultProps = {
    value: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
  }

  handleExpendClick = () => {
    const expand = !this.state.expand;
    this.setState({
      expand,
    });
  };

  handleRssClick = () => {};

  handleChange = (field, value) => {
    const { onClick } = this.props;
    onClick({ field, value });
  };

  render() {
    const { formItems, value } = this.props;
    const { expand } = this.state;

    return (
      <div className={s.root}>
        <div className={s.tools}>
          <FilterRss onClick={this.handleRssClick} />
          <Button
            icon={expand ? 'up' : 'down'}
            onClick={this.handleExpendClick}
          >
            展开筛选
          </Button>
        </div>
        <Form className={s.form} style={{ display: expand ? 'block' : 'none' }}>
          {formItems.map(formItem => {
            const { formType, options, placeholder, field } = formItem;
            let Control = null;
            switch (formType) {
              case 'radio':
                Control = (
                  <RadioTag
                    value={value[field] || emptyValue}
                    options={options}
                    onChange={val => this.handleChange(field, val)}
                  />
                );
                break;
              case 'radioTime':
                Control = (
                  <TimeGroup
                    value={value[field] || emptyValue}
                    onChange={val => this.handleChange(field, val)}
                  />
                );
                break;
              case 'searchSelect':
                Control = (
                  <SearchSelect
                    placeholder={placeholder}
                    style={{ width: 420 }}
                  />
                );
                break;
              default:
                Control = (
                  <Input placeholder={placeholder} style={{ width: 420 }} />
                );
            }

            return (
              <FormItem
                key={formItem.key}
                {...formItemLayout}
                className={s.item}
                label={formItem.label}
              >
                {Control}
              </FormItem>
            );
          })}
        </Form>
      </div>
    );
  }
}

export default withStyles(s)(FilterForm);
