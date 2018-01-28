import React, { Component } from 'react'
import MessageProvidersListItem from './MessageProvidersListItem'
import NewMessageProviderItem from './NewMessageProviderItem'


class MessageProvidersList extends Component {
  componentDidMount() {
    this.props.getMessageProviders()
  }

  render() {
    return (
      <ul>
        {this.props.messageProviders.map((messageProvider) => (
          <MessageProvidersListItem key={messageProvider.messageProviderType} {...messageProvider} />
        ))}
        <NewMessageProviderItem />
      </ul>
    )
  }
}

export default MessageProvidersList