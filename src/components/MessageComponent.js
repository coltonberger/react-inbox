
import React, { Component } from 'react';


class MessageComponent extends Component {
  render () {

    const label = this.props.message.labels.map((label, i) => (
      <span key={i} className="label label-warning">{label}</span>
    ))

    return (
      <div className={`row message ${this.props.message.read ? 'read' : 'unread'}
                      ${this.props.message.selected ? 'selected' : ''}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input
               type="checkbox"
               checked={this.props.message.selected}
               onChange={ () => this.props.selectedMessage(this.props.message)}
               />
            </div>
            <div className="col-xs-2">
              <i className={`star fa fa-star${this.props.message.starred ? '' : '-o'}`}
                 onClick={ () => this.props.starMessage(this.props.message)}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11"
        onClick={ () => this.props.messageRead(this.props.message)}
        >
        {label}

        <a href="#">
          {this.props.message.subject}
        </a>
        </div>
      </div>
    )
  }
}


export default MessageComponent
