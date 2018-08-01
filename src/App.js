import React, { Component } from 'react'
import './App.css';
import ToolbarComponent from './components/ToolbarComponent'
import MessageListComponent from './components/MessageListComponent'
import ComposeMessageComponent from './components/ComposeMessageComponent'

class App extends Component {

  state = {
    messages: [

    ]}

    //Get current message inbox from API:
    // React API
      componentDidMount = async () => {
        await this.getDataFromAPI()
      }
      // loading messages from the server
      getDataFromAPI = async () => {
        // fetch messagesJson
        const messagesJson = await fetch('http://localhost:8082/api/messages')
        let messages = await messagesJson.json()
        console.log('coming from API === ', messages)
        this.setState({messages})
      }


    sendMessage = async () => {
      const subject = document.querySelector('#subject').value
      const body = document.querySelector('#body').value
      const response =
      await fetch('http://localhost:8082/api/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          body,
        })
      })
      this.showComposeTemplate()
    }


    //Message changes
    starClicked = async (message) => {
      //console.log('clicked')
      message.starred = !message.starred
      this.setState(this.state.messages.concat(message)); //concat adds the new state of the message into the message without adding a new one
      // construct object for request body {command: "star", messageIds: [message.id]}
        let postData = {
          command: "star",
          messageIds: [message.id]
        }
      // run the fetch
      const messagesJson = await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postData)
      }
    )

    let messages = await messagesJson.json()
      // when the response comes back, we should get all the messages back, so just setState on the response
    this.setState({messages})
    }

    selectedMessage = (message) => {
      //console.log('clicked');
      message.selected = !message.selected
      this.setState(this.state.messages.concat(message));
    }

    messageRead = async (message) => {
      //console.log("this is a message === ", message);
      // construct object for request body {command: "star", messageIds: [message.id]}
      let postData = {
        command: 'read',
        read: !message.read,
        messageIds: [message.id]
      }
      // run the fetch
      //console.log("About to run a put to the messages (unread)")
      const messagesJson = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      let messages = await messagesJson.json()
      console.log("Came back from the patch and parsed json and got: ", messages)
        // when the response comes back, we should get all the messages back, so just setState on the response
      this.setState({messages})
    }

    markAsUnread = async (message) => {
      //console.log("this is a message === ", message);
      // construct object for request body {command: "star", messageIds: [message.id]}
      let postData = {
        command: 'read',
        read: message.read,
        messageIds: [message.id]
      }
      // run the fetch
      //console.log("About to run a put to the messages (unread)")
      const messagesJson = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(postData)
      })
      let messages = await messagesJson.json()
      console.log("Came back from the patch and parsed json and got: ", messages)
        // when the response comes back, we should get all the messages back, so just setState on the response
      this.setState({messages})
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

    deleteMessage =  async () => {
      const selected = this.state.messages.filter(message => message.selected)
      const messageIds = selected.map(message => message.id)

      await fetch('http://localhost:8082/api/messages',
        {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({

          messageIds,
          "command": "delete"
        })
      })
      .then(response => this.updateMessages())
    }

    updateMessages = async () => {
      const response = await fetch('http://localhost:8082/api/messages')
      const json = await response.json()
      this.setState({messages: json})
    }

    showComposeTemplate = () => {
      //console.log('compose message clicked')
      this.setState({
        showCompose: !this.state.showCompose
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
           showComposeTemplate = {this.showComposeTemplate}
           messageRead = {this.messageRead}
          />

          <ComposeMessageComponent
            showCompose={this.state.showCompose}
            sendMessage={this.sendMessage}
          />

          <MessageListComponent
            messages = {this.state.messages}
            starMessage = {this.starClicked}
            selectedMessage = {this.selectedMessage}
            messageRead = {this.messageRead}
          />
        </div>
      )
    }
}

export default App;
