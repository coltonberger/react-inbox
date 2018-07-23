import React, { Component } from 'react';
import ToolbarComponent from './components/ToolbarComponent';
import MessageListComponent from './components/MessageListComponent';

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
    ]
  }

  starMessage = (message) => {
    //console.log('clicked', message)
    message.starred = !message.starred
    this.setState(this.state.messages.concat(message))
  }

  selectMessage = (message) => {
    message.selected = !message.selected
    this.setState(this.state.messages.concat(message))
  }

  readMessage = (message) => {
    message.read = true
    this.setState(this.state.messages.concat(message))
  }

  selectedIndicator = () => {
    let amountSelected = this.state.messages.filter( message => {
      return message.selected
    }).length

    let action = ''

    if (amountSelected === this.state.messages.length) {
      action = '-check'
    } else if (amountSelected === 0){
      action = ''
    } else {
      action = '-minus'
    }

      return action
  }

  //when clicked all should messages should be checked
  selectedIndicatorFunc = () => {
    let amountSelected = this.state.messages.filter( message => {
      return message.selected
    }).length

    if (amountSelected === this.state.messages.length) {
      this.setState({
        message: this.state.messages.map(message => {
          message.selected = false
          return message
        })
      })
    } else {
      this.setState({
        message: this.state.messages.map(message => {
          message.selected = true
          return message
        })
      })
    }
  }

  markReadStatus(){
    let selectedMessages = this.state.messages.filter(message => message.selected)
    this.setState(this.state.messages.concat(selectedMessages.map(message => {
      message.read = true
      return message
    })))
  }

  markUnreadStatus(){
    let selectedMessages = this.state.messages.filter( message => message.selected)
    this.setState(this.state.messages.concat(selectedMessages.map(message => {
      message.read = false
      return message
    })))
  }

  disableReadButton =() => {
    let selectedMessages = this.state.messages.filter( message => message.selected)
    let readStatusArray = selectedMessages.map(message => {
      return message.read ? true : false
    })
    return readStatusArray.includes(true) || readStatusArray.length === 0 ? 'disable' : ''
  }

  disableUnreadButton =() => {
    let selectedMessages = this.state.messages.filter( message => message.selected)
    let readStatusArray = selectedMessages.map(message => {
      return message.read ? true : false
    })
    return readStatusArray.includes(false) || readStatusArray.length === 0 ? 'disable' : ''
  }

  render() {
    return (
      <div className="App">
        <ToolbarComponent
          messages={this.state.messages}
          selectedIndicator={this.selectedIndicator}
          selectedIndicatorFunc={this.selectedIndicatorFunc}
          markReadStatus={this.markReadStatus}
          markUnreadStatus={this.markUnreadStatus}
          disableReadButton={this.disableReadButton}
          disableUnreadButton={this.disableUnreadButton}

        />
        <MessageListComponent
          messages={this.state.messages}
          starMessage={this.starMessage}
          selectMessage={this.selectMessage}
          readMessage={this.readMessage}
        />
      </div>
    );
  }
}

export default App;
