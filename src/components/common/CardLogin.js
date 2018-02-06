import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import TiPlus from 'react-icons/lib/ti/plus'

import './CardLogin.css'

export default class CardLogin extends Component {
  static propTypes = {
    onAddNew: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onAddNew: () => {},
  }

  render() {
    const { onAddNew } = this.props

    return (
      <Card>
        <div className="cardlogin--wrap">
          <h4 className="cardlogin--name">Hi Jack!</h4>
          <div className="cardlogin--add">
            <TiPlus className="cardlogin--add-icon" onClick={onAddNew} />
          </div>
          <a href="" className="cardlogin--link">
            Logout
          </a>
        </div>
      </Card>
    )
  }
}
