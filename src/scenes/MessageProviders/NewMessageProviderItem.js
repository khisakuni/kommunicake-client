import React, { Component } from 'react'
import _ from 'lodash'
import { postGmailLoginLink } from '../../services/api/message-providers'

const messageProviderOptions = {
  'Gmail': postGmailLoginLink,
}

export default class NewMessageProviderItem extends Component {
  constructor(props) {
    super(props)

    this.state = { showForm: false, loadingConnectButton: false, url: '#' }
    this.toggleForm = this.toggleForm.bind(this)
    this.addNewMessageProviderForm = this.addNewMessageProviderForm.bind(this)
    this.onSelectChange = this.onSelectChange.bind(this)
  }

  toggleForm() {
    this.setState({ ...this.state, showForm: !this.state.showForm })
  }

  onSelectChange(event) {
    this.setState({ ...this.state, loadingConnectButton: true })
    messageProviderOptions[event.target.value]()
      .then(({ RedirectURL }) => this.setState({ ...this.state, url: RedirectURL }))
      .then(() => {
        this.setState({ ...this.state, loadingConnectButton: false })
      })
  }

  addNewMessageProviderForm() {
    return (
      <div>
        <a onClick={this.toggleForm}>Close</a>
        <select onChange={this.onSelectChange}>
          <option>Select a message provider...</option>
          {_.keys(messageProviderOptions).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {
          this.state.loadingConnectButton ? 
            <p>loading...</p> :
            <a href={this.state.url} className="button">Connect</a>
        }

      </div>
    )
  }

  showFormLink() {
    return <a onClick={this.toggleForm}>Add New</a>
  }

  render() {
    return (
      <li>
        {this.state.showForm ? this.addNewMessageProviderForm() : this.showFormLink() }
      </li>
    )
  }
}