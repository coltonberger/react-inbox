import React, { Component } from 'react'
import MessageComponent from './MessageComponent'
//grabbing state and now have access to it. USE PROPS

const MessageListComponent = props => {
  //console.log(props.messages)
  return props.messages.map(message =>
    <MessageComponent
      key={message.id}
      message={message}
      starMessage={props.starMessage}
      selectedMessage = {props.selectedMessage}
      messageRead= {props.messageRead}
      />
  )
}

export default MessageListComponent;
