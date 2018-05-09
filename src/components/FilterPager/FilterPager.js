import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Select, Icon, Dropdown, Button, Menu } from 'antd';
import s from './FilterPager.less';

class FilterPager extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    total: PropTypes.number,
    pageOptions: PropTypes.array,
    pageNum: PropTypes.number,
    pageSize: PropTypes.pageSize,
  };

  static defaultProps = {
    total: 0,
    pageNum: 1,
    pageSize: 60,
    pageOptions: ['60', '100', '200'],
  };

  constructor(props) {
    super(props);

    this.state = {
      pageSize: '60',
      pageNum: 1,
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleKeyUpInput = this.handleKeyUpInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { pageNum, pageSize } = this.state;
    if (pageNum != nextProps.pageNum) {
      this.state.pageNum = nextProps.pageNum;
    }
    if (pageSize != nextProps.pageSize) {
      this.state.pageSize = nextProps.pageSize;
    }
  }

  handleMenuClick(menu) {
    const { onChange } = this.props;
    const pageSize = menu.key;
    const pageNum = 1;

    if (this.props.pageNum === undefined) {
      this.setState({
        pageSize,
        pageNum,
      });
      return;
    }
    onChange({
      pageSize,
      pageNum,
    });
  }

  handleClickLeft() {
    let { pageNum } = this.state;
    if (pageNum === 1) {
      return;
    }

    pageNum--;

    this.changePageNum(pageNum);
  }

  handleKeyUpInput(e) {
    const { keyCode } = e;
    // console.log(e, keyCode);
    if (keyCode === 13) {
      const { total } = this.props;
      let { pageNum, pageSize } = this.state;
      const maxNum = Math.ceil(total / pageSize);

      if (pageNum <= 0) {
        pageNum = 0;
      } else if (pageNum >= maxNum) {
        pageNum = maxNum;
      }

      this.changePageNum(pageNum);
    }
  }

  handleClickNext() {
    const { total } = this.props;
    let { pageNum, pageSize } = this.state;
    const maxNum = Math.ceil(total / pageSize);
    if (pageNum === maxNum) {
      return;
    }

    pageNum++;

    this.changePageNum(pageNum);
  }

  handleChangeInput(e) {
    const pageNum = e.target.value.replace(/\D+/g, '');
    // console.log(e);
    this.setState({
      pageNum,
    });
  }

  changePageNum = pageNum => {
    const { onChange } = this.props;

    if (this.props.pageNum === undefined) {
      this.setState({
        pageNum,
      });
      return;
    }

    onChange({
      pageNum,
    });
  };

  render() {
    const { total, pageOptions, className, isRight } = this.props;
    const { pageSize, pageNum } = this.state;

    const pageOptionsNode = (
      <Menu onClick={this.handleMenuClick}>
        {pageOptions.map(p => (
          <Menu.Item value={p} key={p}>
            {p}条/页
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div className={`${s.root} ${className}`}>
        <span className={s.total}>
          共 <strong>{total}</strong> 条
        </span>
        <Input
          onKeyUp={this.handleKeyUpInput}
          style={{ width: 120 }}
          className={s.input}
          value={pageNum}
          onChange={this.handleChangeInput}
          addonBefore={<Icon onClick={this.handleClickLeft} type="left" />}
          addonAfter={<Icon onClick={this.handleClickNext} type="right" />}
        />
        <Dropdown overlay={pageOptionsNode}>
          <Button style={{ marginLeft: 8 }}>
            {pageSize}条/页 <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default withStyles(s)(FilterPager);
