import React, { Component } from 'react'
import './App.css';
import ToolbarComponent from './components/ToolbarComponent'
import MessageListComponent from './components/MessageListComponent'

class App extends Component {

  state = {
    messages: [
      {
        "id": 1,
        "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        "read": false,
        "starred": true,
        "labels": ["dev", "personal"]
      },
      {
        "id": 2,
        "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        "read": false,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 3,
        "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        "read": false,
        "starred": true,
        "labels": ["dev"]
      },
      {
        "id": 4,
        "subject": "We need to program the primary TCP hard drive!",
        "read": true,
        "starred": false,
        "selected": true,
        "labels": []
      },
      {
        "id": 5,
        "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        "read": false,
        "starred": false,
        "labels": ["personal"]
      },
      {
        "id": 6,
        "subject": "We need to back up the wireless GB driver!",
        "read": true,
        "starred": true,
        "labels": []
      },
      {
        "id": 7,
        "subject": "We need to index the mobile PCI bus!",
        "read": true,
        "starred": false,
        "labels": ["dev", "personal"]
      },
      {
        "id": 8,
        "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        "read": true,
        "starred": true,
        "labels": []
      }
    ]}

    //Message changes
    starClicked = (message) => {
      //console.log('clicked')
      message.starred = !message.starred
      this.setState(this.state.messages.concat(message)); //concat adds the new state of the message into the message without adding a new one
    }

    selectedMessage = (message) => {
      //console.log('clicked');
      message.selected = !message.selected
      this.setState(this.state.messages.concat(message));
    }

    messageRead = (message) => {
      //console.log('message clicked')
      message.read = true
      this.setState(this.state.messages.concat(message));
    }

    //TOOLBAR CHANGE
    toolbarMessageIconChange = () => {
      let numMessageSelected = this.state.messages.filter((message) => {
        return message.selected
      }).length

      let action = ''

      if (numMessageSelected === this.state.messages.length){
        action = '-check'
      } else if (numMessageSelected === 0) {
        action = ''
      } else {
        action = '-minus'
      }

      return action
    }

    selectAllBtnAction = () => {
      let numMessageSelected = this.state.messages.filter((message) => {
        return message.selected
      }).length

      if(numMessageSelected === this.state.messages.length) {
        this.setState({
          message: this.state.messages.map((message) => {
            message.selected = false
            return message
          })
        })
      } else {
        this.setState({
          message: this.state.messages.map((message) => {
            message.selected = true
            return message
          })
        })
      }
    }

    markAsRead = () => {
      //console.log('markAsRead clicked')
      this.setState({
        messages: this.state.messages.map(message => (
          message.selected ? { ...message, read: true } : message
        ))
      })
    }

    markAsUnread = () => {
      //console.log('markAsUnread clicked')
      this.setState({
        messages: this.state.messages.map(message => (
          message.selected ? { ...message, read: false } : message
        ))
      })
    }

    addLabel = (label) => {
      if(label === 'Apply label') return
      let selectedMessages = this.state.messages.filter(message => message.selected)

      this.setState(this.state.messages.concat(selectedMessages.map(message => {
        if(message.labels.includes(label)) return message
        message.labels.push(label)
        return message
      })))
    }

    removeLabel = (label) => {
      if(label === 'Remove label') return
      let selectedMessages = this.state.messages.filter( message => message.selected)
      this.setState(this.state.messages.concat(selectedMessages.map(message => {
        message.labels.splice(label, 1)
        return message
      })))
    }

    deleteMessage = () => {
      //console.log('delete icon clicked')
      this.setState({
        messages: this.state.messages.filter(message => {
          return !message.selected
        })
      })
    }

    render() {
      return (
        <div className = "App">
          <ToolbarComponent
           messages = {this.state.messages}
           toolbarMessageIconChange = {this.toolbarMessageIconChange}
           selectAllBtnAction = {this.selectAllBtnAction}
           markAsRead = {this.markAsRead}
           markAsUnread= {this.markAsUnread}
           deleteMessage= {this.deleteMessage}
           addLabel = {this.addLabel}
           removeLabel = {this.removeLabel}
          />

          <MessageListComponent
            messages = {this.state.messages}
            starMessage = {this.starClicked}
            selectedMessage = {this.selectedMessage}
            messageRead = {this.markAsRead}
          />
        </div>
      )
    }
}

export default App;
