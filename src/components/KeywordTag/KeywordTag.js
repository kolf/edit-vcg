import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'
import { fetchKeywordDict } from 'actions/keywordDict'
import s from './KeywordTag.less'

function Tag ({ value, label, onClick, onClose }) {
  if (!/\S+/g.test(label)) {
    return null
  }
  return (
    <li
      className={classNames('ant-select-selection__choice', {
        'is-error': value === '',
        'is-success': /\,/.test(value)
      })}
    >
      <div className='ant-select-selection__choice__content' onClick={onClick}>
        {label}
      </div>
      <span
        className='ant-select-selection__choice__remove'
        onClick={onClose}
      />
    </li>
  )
}

class KeywordTag extends Component {
  static propsTypes = {
    value: PropTypes.array
  }

  state = {
    focused: false,
    inputValue: '',
    value: []
  }

  componentDidUpdate () {
    const { inputRef, InputMirrorRef } = this
    const { inputValue } = this.state
    if (inputValue) {
      inputRef.style.width = ''
      inputRef.style.width = `${InputMirrorRef.clientWidth}px`
    } else {
      inputRef.style.width = ''
    }
  }

  handleChangeInputValue = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  setInputFocus = e => {
    this.setState(
      {
        focused: true
      },
      () => {
        this.inputRef.focus()
      }
    )
  }

  handleInputKeydown = e => {
    const { keyCode } = e
    if (keyCode === 13 || keyCode === 188) {
      this.fetchKeywordDict()
    }
  }

  changeValue = (addValues = [], removeValue = {}) => {
    let value = this.getValue()
    value = value
      .concat(addValues)
      .filter(
        v =>
          (removeValue.value
            ? removeValue.value !== v.value
            : removeValue.label !== v.label)
      )
    this.state.inputValue = ''
    if (!this.props.value) {
      this.setState({
        value
      })
    }

    this.props.onChange && this.props.onChange(value)
  }

  fetchKeywordDict = () => {
    const { inputValue } = this.state
    if (/\S/.test(inputValue)) {
      let names = inputValue.split(/[,，]/)
      this.props
        .fetchKeywordDict({
          name: names
        })
        .then(keywordsOption => {
          this.changeValue(keywordsOption)
        })
    }
  }

  getValue = () => this.props.value || this.state.value

  render () {
    const { focused, inputValue } = this.state
    let value = this.getValue()

    console.log(value)

    return (
      <div className='ant-select ant-select-enabled'>
        <div className='ant-select-selection ant-select-selection--multiple'>
          <div
            className='ant-select-selection__rendered'
            onClick={this.setInputFocus}
          >
            <div
              className='ant-select-selection__placeholder'
              style={{
                display: value.length > 0 || inputValue ? 'none' : 'block'
              }}
            >
              请输入关键词
            </div>
            <ul className={s.tags}>
              {value.map(v => (
                <Tag onClose={this.changeValue.bind(this, [], v)} {...v} />
              ))}
              <li className='ant-select-search ant-select-search--inline'>
                <div className='ant-select-search__field__wrap'>
                  <input
                    value={inputValue}
                    className='ant-select-search__field'
                    ref={f => (this.inputRef = f)}
                    onChange={this.handleChangeInputValue}
                    onKeyDown={this.handleInputKeydown}
                    onBlur={this.fetchKeywordDict}
                  />
                  <span
                    className='ant-select-search__field__mirror'
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
    )
  }
}
const mapState = state => ({
  keywordDict: state.keywordDict.map
})

const mapDispatch = {
  fetchKeywordDict
}

export default connect(mapState, mapDispatch)(withStyles(s)(KeywordTag))
