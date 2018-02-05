import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import TiPlus from 'react-icons/lib/ti/plus'

import './CardLogin.css'

export default class CardLogin extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    someProp: PropTypes.string,
  }
  static defaultProps = {
    someProp: 'someValue',
  }

  constructor(props) {
    super(props)
    this.state = {
      someState: true,
    }
  }

  render() {
    return (
      <Card>
        <div className="cardlogin--wrap">
          <h4 className="cardlogin--name">Hi Jack!</h4>
          <div className="cardlogin--add">
            <TiPlus className="cardlogin--add-icon" />
          </div>
          <a href="" className="cardlogin--link">
            Logout
          </a>
        </div>
      </Card>
    )
  }
}
