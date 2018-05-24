import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { fetchKeywordDict } from 'actions/keywordDict'
import s from './KeywordTag.less'

function Tag ({ label, onClick, onClose }) {
  return (
    <li className='ant-select-selection__choice'>
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
    value: PropTypes.array.isRequire
  }

  static defaultProps = {
    value: []
  }

  state = {
    focused: false,
    inputValue: ''
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

  handleClickPlaceholder = e => {
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
      const { inputValue } = this.state
      if (/\S/.test(inputValue)) {
        this.props.fetchKeywordDict({
          name: inputValue.split(/[,，]/)
        })
      }
    }
  }

  render () {
    const { value } = this.props
    const { focused, inputValue } = this.state

    console.log(this.props.keywordDict)

    return (
      <div className='ant-select ant-select-enabled'>
        <div className='ant-select-selection ant-select-selection--multiple'>
          <div
            className='ant-select-selection__rendered'
            onClick={this.handleClickPlaceholder}
          >
            <div
              className='ant-select-selection__placeholder'
              style={{
                display: value.length > 0 || inputValue ? 'none' : 'block'
              }}
            >
              请输入关键词
            </div>
            <ul>
              {value.map(v => {
                const [label, value] = v.split('|')
                return <Tag label={label} />
              })}
              <li className='ant-select-search ant-select-search--inline'>
                <div className='ant-select-search__field__wrap'>
                  <input
                    value={inputValue}
                    className='ant-select-search__field'
                    ref={f => (this.inputRef = f)}
                    onChange={this.handleChangeInputValue}
                    onKeyDown={this.handleInputKeydown}
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
