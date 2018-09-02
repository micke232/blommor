import React, { Component } from 'react';
import RoomCard from './RoomCard/RoomCard';
import FlowerCard from './FlowerCard/FlowerCard';
import fire from './fire'
import loader from './loader.gif'
import './App.css';

class App extends Component {

  state = {
    roomSelected: '',
    rooms: [],
    flowers: [],
    init: false,
  }

  componentDidMount() {
   fire('flowers', 'GET').then((data)=>{
    const rooms = [];
    data.forEach((room) => {
      const checkIfExist = rooms.find((unique)=> unique === room.room)
      if (!checkIfExist) {
        rooms.push(room.room)
      }
    });
    this.setState({ flowers: data, rooms, init: true })
   })
  }

  onRoomClicked = ( room ) => {
    this.setState({ roomSelected: room })
  }

  post = () => {
    const obj = {
      name: 'Växt 1',
      room: 'Köket',
      interval: '3',
      watered_latest: '324'
    };
    fire('flowers', 'POST', obj)
  }

  renderRooms() {
    const { rooms } = this.state;
    return rooms.map((room)=> <RoomCard key={room} onRoomClicked={this.onRoomClicked} name={room} />)
    ;
  }

  renderFlowers() {
    const { flowers, roomSelected } = this.state;
    return flowers.map((flower)=> {
      if(flower.room === roomSelected )  {
        return <FlowerCard key={flower.name} name={flower.name} />
      } else return null;
    })
  }

  render() {
    const { roomSelected, init } = this.state;
    return (
      <div className="mainContainer">
        <h1>Flower Check</h1>
        <button onClick={this.post}>POST</button>
        {
          !init && <img src={loader} />
        }
        {
          roomSelected === '' && this.renderRooms()
        }
        {
          roomSelected !== '' && this.renderFlowers()
        }
        <button onClick={()=>this.onRoomClicked('')}>back</button>
      </div>
    );
  }
}

export default App;
