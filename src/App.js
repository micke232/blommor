import React, { Component } from 'react';
import RoomCard from './RoomCard/RoomCard';
import fire from './fire'
import './App.css';

class App extends Component {

  state = {
    roomSelected: '',
  }

  componentDidMount() {
   fire('Flowers', 'GET').then((data)=>{
    this.setState({ flowers: data })
   })
  }

  onRoomClicked = ( room ) => {
    this.setState({ roomSelected: room })
  }

  post = () => {
    const obj = {
      id: '1',
      room: '1',
    };
    fire('Flowers', 'POST', obj)
  }

  renderRooms() {
    return (
      <React.Fragment>
        <RoomCard onRoomClicked={this.onRoomClicked} name={'Vardagsrum'} />
        <RoomCard onRoomClicked={this.onRoomClicked} name={'Stora Sovrummet'} />
        <RoomCard onRoomClicked={this.onRoomClicked} name={'Rasmus Rum'} />
        <RoomCard onRoomClicked={this.onRoomClicked} name={'Kök'} />
      </React.Fragment>
    );
  }

  render() {

    const { roomSelected } = this.state;

    return (
      <div className="mainContainer">
        <h1>Flower Check</h1>
        <button onClick={this.post}>POST</button>
        {
          roomSelected === '' && this.renderRooms()
        }
      </div>
    );
  }
}

export default App;
