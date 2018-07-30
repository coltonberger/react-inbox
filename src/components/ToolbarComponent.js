import React from 'react'

const ToolbarComponent = (props) => {

  //toolbar messageunread count change
  let UnreadMessagesCount = props.messages.filter(message => !message.read).length

  return (
    <div className="row toolbar">
    <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{UnreadMessagesCount}</span>
      unread messages
    </p>

    <a className="btn btn-danger">
      <i
        className="fa fa-plus"
        onClick={() => props.showComposeTemplate()}
      ></i>
    </a>

    <button className="btn btn-default">
      <i
      className={`fa fa${props.toolbarMessageIconChange()}-square-o`}
      onClick={() => props.selectAllBtnAction()}
      ></i>
    </button>

    <button className="btn btn-default"
            onClick={() => props.markAsRead()}
            >Mark As Read
    </button>

    <button className="btn btn-default"
            onClick={() => props.markAsUnread()}
            >Mark As Unread
    </button>

    <select className="form-control label-select"
      onChange={() => props.addLabel( document.querySelectorAll('select')[0].value)}
      >
      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select"
      onChange={() => props.removeLabel( document.querySelectorAll('select')[1].value)}
      >
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default">
      <i className="fa fa-trash-o"
         onClick={() => props.deleteMessage()}
      ></i>
    </button>
  </div>
</div>
  )
}

export default ToolbarComponent;
