import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { fetchKeywordDict } from 'actions/keywordDict';
import KeywordSelectModal from './KeywordSelectModal';
import s from './KeywordTag.less';

function Tag({ value, label, onClick, onClose }) {
  if (!/\S+/g.test(label)) {
    return null;
  }
  return (
    <li
      className={classNames('ant-select-selection__choice', {
        'is-error': value === '',
        'is-success': /\,+/g.test(value),
      })}
    >
      <div className="ant-select-selection__choice__content" onClick={onClick}>
        {label}
      </div>
      <span
        className="ant-select-selection__choice__remove"
        onClick={onClose}
      />
    </li>
  );
}

class KeywordTag extends Component {
  static propsTypes = {
    value: PropTypes.array,
  };

  static defaultProps = {
    keywordDict: {},
  };

  state = {
    focused: false,
    inputValue: '',
    value: [],
    keywordSelectModalVisible: false,
    keywordUpdateModalVisible: false,
  };

  keywordIds = '';

  componentDidUpdate() {
    const { inputRef, InputMirrorRef } = this;
    const { inputValue } = this.state;
    if (inputValue) {
      inputRef.style.width = '';
      inputRef.style.width = `${InputMirrorRef.clientWidth}px`;
    } else {
      inputRef.style.width = '';
    }
  }

  handleChangeInputValue = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  setInputFocus = e => {
    this.setState(
      {
        focused: true,
      },
      () => {
        this.inputRef.focus();
      },
    );
  };

  handleInputKeydown = e => {
    const { keyCode } = e;
    if (keyCode === 13 || keyCode === 188) {
      this.fetchKeywordDict();
    }
  };

  changeValue = (addValues = [], removeValue = {}) => {
    let value = this.getValue();
    value = value
      .concat(addValues)
      .filter(
        v =>
          removeValue.value
            ? removeValue.value !== v.value
            : removeValue.label !== v.label,
      );
    this.state.inputValue = '';
    if (!this.props.value) {
      this.setState({
        value,
      });
    }

    this.props.onChange && this.props.onChange(value);
  };

  handleClick = ({ value, label }) => {
    const id = value.match(/\d+/g) || [];

    if (id.length > 1) {
      this.keywordIds = id.join(',');
      this.setState({
        keywordSelectModalVisible: true,
      });
    }
  };

  closeKeywordSelectModal = () => {
    this.keywordIds = '';
    this.setState({
      keywordSelectModalVisible: false,
    });
  };

  fetchKeywordDict = () => {
    const { inputValue } = this.state;
    if (/\S/.test(inputValue)) {
      const name = inputValue.split(/[,，]/);
      this.props.fetchKeywordDict({ name }).then(keywordsOption => {
        this.changeValue(keywordsOption);
      });
    }
  };

  getValue = () => {
    let value = this.state.value;
    const propValue = this.props.value;
    if (propValue && propValue.length) {
      const { keywordDict } = this.props || {};
      value = propValue.map(v => {
        if (typeof v === 'string') {
          const keyword = keywordDict[v];
          if (keyword) {
            return {
              label: keyword.displayName,
              value: keyword.id,
            };
          }
        } else {
          return v;
        }
      });
    }

    return value;
  };

  handleselect = keywords => {
    console.log(111111, keywords, this.keywordIds);
    let newValue = this.getValue().reduce((result, val, index) => {
      if (val.value == this.keywordIds) {
        result.push(...keywords);
      } else {
        result.push(val);
      }
      return result;
    }, []);

    this.closeKeywordSelectModal();
    this.props.onChange && this.props.onChange(newValue);
  };

  render() {
    const {
      focused,
      inputValue,
      keywordSelectModalVisible,
      keywordUpdateModalVisible,
    } = this.state;
    let value = this.getValue();

    return (
      <div className="ant-select ant-select-enabled">
        <KeywordSelectModal
          multiple={true}
          visible={keywordSelectModalVisible}
          keywordIds={this.keywordIds}
          onCancel={this.closeKeywordSelectModal}
          onChange={this.handleselect}
        />
        <div className="ant-select-selection ant-select-selection--multiple">
          <div
            className="ant-select-selection__rendered"
            onClick={this.setInputFocus}
          >
            <div
              className="ant-select-selection__placeholder"
              style={{
                display: value.length > 0 || inputValue ? 'none' : 'block',
              }}
            >
              请输入关键词
            </div>
            <ul className={s.tags}>
              {value.map(v => (
                <Tag
                  onClick={e => this.handleClick(v, e)}
                  onClose={this.changeValue.bind(this, [], v)}
                  {...v}
                />
              ))}
              <li className="ant-select-search ant-select-search--inline">
                <div className="ant-select-search__field__wrap">
                  <input
                    value={inputValue}
                    className="ant-select-search__field"
                    ref={f => (this.inputRef = f)}
                    onChange={this.handleChangeInputValue}
                    onKeyDown={this.handleInputKeydown}
                    onBlur={this.fetchKeywordDict}
                  />
                  <span
                    className="ant-select-search__field__mirror"
                    ref={f => (this.InputMirrorRef = f)}
                  >
                    {inputValue}&nbsp;
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  keywordDict: state.keywordDict.mapData,
});

const mapDispatch = {
  fetchKeywordDict,
};

export default connect(mapState, mapDispatch)(withStyles(s)(KeywordTag));
