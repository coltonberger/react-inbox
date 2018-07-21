import React, { Component } from 'react'
import MessageComponent from './MessageComponent'

class MessageListComponent extends Component {

  render () {
    //console.log(this.props.messages)
    let messageList = this.props.messages.map((message, index) => {
      return (
        <MessageComponent
        key={index}
        message={message}
        />
      )
    })

    return (
      <div>
        {messageList}
      </div>
    );
  }
}

export default MessageListComponent;
