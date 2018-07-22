import React, { Component } from 'react'

const Message = ({
  message,
  starMessage,
  selectMessage,
  readMessage
}) => {
  let labelList = message.labels.map((label, index) => {
    return (
      <span key={index} className="label label-warning">{label}</span>
    )
  })

  return (
    <div className={`row message read ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox"
                   checked={message.selected}
                   onChange={() => selectMessage(message)}
            />
          </div>
          <div className="col-xs-2">
            <i className={`star fa fa-star${message.starred ? '' : '-o'}`}
               onClick={() => starMessage(message)}
            ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={() => readMessage(message)}>
        {labelList}
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message;
