import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from './config';



class App extends Component {

  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.createRoom=this.createRoom.bind(this)
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'DummyUser',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.getRooms()
      //this.subscribeToRoom()


    }).catch(err => console.log('error on suscribe conn: ',err ))

  }

  subscribeToRoom(roomId) {
      this.setState({messages: []})
      this.currentUser.subscribeToRoom({
        roomId:roomId,
        hooks: {
          onMessage: message => {
            console.log(message.text);
            this.setState({
              messages: [...this.state.messages,message]
            })
          }
        }

      })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.getRooms()
      })
      .catch(error => 'error')
  }
  getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(err => console.log('error on joinableRooms: ',err))


  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with create room'))


  }

  render() {
    console.log('this.state.messages:',this.state.messages);
    return (
      <div className="App">
        <RoomList
        roomId={this.state.roomId}
         subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages} roomId={this.state.roomId} />
        <SendMessageForm sendMessage={this.sendMessage} disabled={!this.state.roomId} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
