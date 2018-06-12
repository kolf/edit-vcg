import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './RadioTag.less';

class RadioTag extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    options: [],
  };

  handleClick = key => {
    const { value, onChange } = this.props;
    let newValue = key;
    if (value === key) {
      newValue = '';
    }

    onChange(newValue);
  };

  render() {
    const { options, value } = this.props;

    return (
      <span className={s.root}>
        {options.map(o => (
          <label
            key={o.value}
            className={s.item + (o.value === value ? ' is-active' : '')}
            onClick={() => this.handleClick(o.value)}
          >
            {o.label}
          </label>
        ))}
      </span>
    );
  }
}

export default withStyles(s)(RadioTag);
