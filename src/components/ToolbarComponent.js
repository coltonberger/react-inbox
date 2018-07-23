import React, { Component } from 'react'

class ToolbarComponent extends Component {

  render () {
    let unReadMessages = this.props.messages.filter(message => !message.read).length

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unReadMessages}</span>
            unread messages
          </p>

          <button className="btn btn-default">
            <i className={`fa fa${this.props.selectedIndicator()}-square-o`}
               onClick={() => this.props.selectedIndicatorFunc()}
            ></i>
          </button>

          <button className="btn btn-default" disabled={`${this.props.disableReadButton()}`} onClick={() => this.props.markReadStatus()}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={`${this.props.disableUnreadButton()}`} onClick={() => this.props.markUnreadStatus()}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled="disabled">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled="disabled">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled="disabled">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ToolbarComponent;
