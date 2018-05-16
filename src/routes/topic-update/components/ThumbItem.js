import React from 'react';
import PropTypes from 'prop-types';
import s from './ThumbList.less';

const propTypes = {};

const defaultProps = {};

class ThumbItem extends React.PureComponent {
  render() {
    let { oss176, id, title, selected } = this.props;

    return (
      <div className={s.item}>
        <div className={s.picture}>
          <img src={oss176} alt="" />
        </div>
        <h5 className={s.title}>2018-02-09 22:43:32</h5>
        <p className={s.caption}>
          ID：{id}
          <br />
          {title}
        </p>
        <p>{selected ? '已选' : '未选'}</p>
      </div>
    );
  }
}

export default ThumbItem;
