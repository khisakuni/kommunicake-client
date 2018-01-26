import React, { Component } from 'react'

class MessageProvidersListItem extends Component {
  render() {
    return (
      <li>{this.props.messageProviderType}</li>
    )
  }
}

export default MessageProvidersListItem