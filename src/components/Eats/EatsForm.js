import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import Dropdown from '../common/Dropdown'
import firebase from '../../config/firebase'
import Geocode from '../../services/Geocode'
import './EatsForm.css'

export default class EatsForm extends Component {
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
      name: '',
      address: '',
      website: '',
      phone: '',
      servesBeer: false,
      category: 'restaurant',
      lat: 0,
      lng: 0,
      addressError: '',
      nameError: '',
      backToList: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: '',
    })
  }

  handleCategoryChange(data) {
    this.setState({ category: data.value })
  }

  toggleBeer = e => {
    this.setState({ servesBeer: !this.state.servesBeer })
  }

  validInput() {
    let status = true
    if (this.state.name === '') {
      this.setState({ nameError: 'Please add a name :)' })
      status = false
    }
    if (this.state.address === '') {
      this.setState({ addressError: 'Please add an address :)' })
      status = false
    }
    return status
  }

  getLatLng = address => {
    var address = this.state.address

    Geocode.getGeocodeFromAddress(address)
      .then(location => {
        this.setState({
          lat: location.results[0].geometry.location.lat,
          lng: location.results[0].geometry.location.lng,
          address: location.results[0].formatted_address,
          addressError: '',
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          // just set something so we don't crash
          lat: 0,
          lng: 0,
          addressError: 'Address not found',
        })
      })
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.validInput()) {
      const eatsRef = firebase.database().ref('eats')
      const eats = {
        name: this.state.name,
        address: this.state.address,
        website: this.state.website,
        phone: this.state.phone,
        servesBeer: this.state.servesBeer,
        category: this.state.category,
        lat: this.state.lat,
        lng: this.state.lng,
      }
      eatsRef.push(eats)
      this.setState({
        backToList: true,
      })
    }
  }

  render() {
    const categories = [{ value: 'restaurant', label: 'restaurant' }, { value: 'market', label: 'market' }]

    if (this.state.backToList) return <Redirect to="/eats" />

    const { name, address, website, phone, servesBeer, category, addressError, nameError } = this.state

    return (
      <div className="eatsform--wrap">
        <form onSubmit={this.handleSubmit} className="eatsform--form">
          <div className="eatsform--input-wrap">
            <label htmlFor="name" className="eatsform--label">
              Name
            </label>
            {nameError && <span className="eatsform--input--error">{nameError}</span>}
            <input type="text" name="name" value={name} className="eatsform--input" onChange={this.handleChange} />
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="address" className="eatsform--label">
              Address
            </label>
            {addressError && <span className="eatsform--input--error">{addressError}</span>}
            <input
              type="text"
              name="address"
              value={address}
              className="eatsform--input"
              onChange={this.handleChange}
              onBlur={this.getLatLng}
            />
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="website" className="eatsform--label">
              Website
            </label>
            <input
              type="text"
              name="website"
              value={website}
              className="eatsform--input"
              onChange={this.handleChange}
            />
          </div>

          <div className="eatsform--input-wrap">
            <label htmlFor="phone" className="eatsform--label">
              Phone
            </label>
            <input type="tel" name="phone" value={phone} className="eatsform--input" onChange={this.handleChange} />
          </div>

          <label className="eatsform--checkbox-container">
            <span className="eatsform--checkbox-label">Serves Alcohol</span>
            <input type="checkbox" onChange={this.toggleBeer} checked={servesBeer} />
            <span className="eatsform--checkmark" />
          </label>

          <Dropdown
            value={category}
            options={categories}
            placeholder="Category"
            className="eatsform--select"
            onChange={this.handleCategoryChange}
          />

          <div className="eatsform--controls">
            <Link to="/eats" className="eatsform--button-link">
              Nope, take me back
            </Link>
            <button className="eatsform--button">Yeah, add it!</button>
          </div>
        </form>
      </div>
    )
  }
}
