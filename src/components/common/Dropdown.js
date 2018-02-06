import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './Dropdown.css'

import classNames from 'classnames'

export default class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    baseClassName: PropTypes.string,
    inputBackgroundColor: PropTypes.string,
    inputColor: PropTypes.string,
    dropdownBackgroundColor: PropTypes.string,
    dropdownColor: PropTypes.string,
    dropdownHoverColor: PropTypes.string,
  }
  static defaultProps = {
    value: '',
    options: {},
    disabled: false,
    placeholder: 'Select...',
    onChange: () => {},
    baseClassName: 'Dropdown',
    inputBackgroundColor: 'white',
    inputColor: 'black',
    dropdownBackgroundColor: 'white',
    dropdownColor: 'black',
    dropdownHoverColor: 'yellow',
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: props.value || {
        label: props.placeholder,
        value: '',
      },
      isOpen: false,
    }
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({ selected: newProps.value })
    } else if (!newProps.value) {
      this.setState({
        selected: {
          label: newProps.placeholder,
          value: '',
        },
      })
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleMouseDown(event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }
  }

  setValue(value, label) {
    let newState = {
      selected: {
        value,
        label,
      },
      isOpen: false,
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent(newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption(option) {
    let optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': option === this.state.selected,
    })

    let value = option.value || option.label || option
    let label = option.label || option.value || option

    return (
      <div
        style={{ color: this.props.dropdownColor }}
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}>
        {label}
      </div>
    )
  }

  buildMenu() {
    let { options, baseClassName } = this.props
    let ops = options.map(option => {
      if (option.type === 'group') {
        let groupTitle = <div className={`${baseClassName}-title`}>{option.name}</div>
        let _options = option.items.map(item => this.renderOption(item))

        return (
          <div className={`${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false })
        }
      }
    }
  }

  render() {
    const { baseClassName, className, inputBackgroundColor, inputColor, dropdownBackgroundColor } = this.props

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    let value = <div className={`${baseClassName}-placeholder`}>{placeHolderValue}</div>
    let menu = this.state.isOpen ? (
      <div style={{ backgroundColor: dropdownBackgroundColor }} className={`${baseClassName}-menu`}>
        {this.buildMenu()}
      </div>
    ) : null

    let dropdownClass = classNames({
      [className]: true,
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen,
    })

    return (
      <div className={dropdownClass}>
        <div
          style={{ backgroundColor: inputBackgroundColor, color: inputColor }}
          className={`${baseClassName}-control ${disabledClass}`}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}>
          {value}
          <span className={`${baseClassName}-arrow`} />
        </div>
        {menu}
      </div>
    )
  }
}
