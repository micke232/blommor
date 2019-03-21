import React, { Component } from 'react';
import { Router, Link } from "@reach/router"

import Rooms from './Rooms/Rooms';
import AddFlower from './AddFlower/AddFlower';
import AddRoom from './AddRoom/AddRoom';
import SelectedRoom from './SelectedRoom/SelectedRoom';

import fire from './fire'
import './App.css';

class App extends Component {
  
  state = {
    roomSelected: '',
    rooms: [],
    flowers: [],
    flowerModalOpen: false,
    roomModalOpen: false,
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    Promise.all([
      fire('flowers', 'GET'),
      fire('rooms', 'GET'),
    ])
    .then(([flowers, rooms])=>{
      const roomData = rooms.map((room)=> {
        return { name: room.name, id: room.id }
      });
      const sortedRoomData = roomData.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
      })
      this.setState({ flowers, rooms: sortedRoomData })
     })
  }

  render() {
    const {
      flowers,
    } = this.state;
    return (
      <div className="mainContainer">
        <div className="header">
          <Link className="addButton" to="add-flower" id="flower">Add flower</Link>
          <br/>
          <br/>
          <Link className="addButton" to="add-room" id="room">Add room</Link>
        </div>
          <Router>
            <Rooms path="/" rooms={this.state.rooms}/>
            <AddRoom update={this.update} path="add-room" />
            <AddFlower update={this.update} path="add-flower" />
            <SelectedRoom path=":roomName" flowers={flowers}/>
          </Router>
      </div>
    );
  }
}

export default App;
