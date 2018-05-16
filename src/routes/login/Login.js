import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Form,
  Input,
  Tabs,
  Button,
  Icon,
  Checkbox,
  Row,
  Col,
  Alert,
} from 'antd';
import { loginUser } from 'actions/user';
import history from '../../history';

import logoUrl from './logo.svg';
import s from './Login.less';

const FormItem = Form.Item;

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    location: PropTypes.any, // eslint-disable-line
    errorMsg: PropTypes.string,
    token: PropTypes.string,
  };

  static defaultProps = {
    isAuthenticated: false,
    isFetching: false,
    location: {},
    errorMsg: '',
  };

  componentDidMount = () => {
    const token = this.props.token || '';
    if (this.props.token) {
      this.props.dispatch(
        loginUser({
          token,
        }),
      );
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      let { userName, password } = values;

      this.props.dispatch(
        loginUser({
          userName,
          password,
        }),
      );
    });
  };

  render() {
    const { form, location, isAuthenticated, route } = this.props;
    const { getFieldDecorator } = form;

    const { from } = location.state || {
      from: { pathname: '/' },
    };

    if (this.props.isAuthenticated) {
      history.push(from);
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.logo}>
            <img src={logoUrl} alt="视觉中国" />
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" className={s.prefixIcon} />}
                  placeholder="请输入用户名"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" className={s.prefixIcon} />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </FormItem>
            <FormItem>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className={s.submit}
                loading={this.props.isFetching}
              >
                登录
              </Button>
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>记住我</Checkbox>)}
              <a className={s.forgot} href="">
                忘记密码？
              </a>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.user.isFetching,
    errorMsg: state.user.errorMsg,
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps)(withStyles(s)(Form.create()(Login)));
