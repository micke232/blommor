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
    this.update();
  }

  update(){
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
        return <FlowerCard key={flower.name} update={this.update} id={flower.id} name={flower.name} />
      } else return null;
    })
  }

  render() {
    const { roomSelected, init } = this.state;
    if (!init) return <div className="mainContainer"><img src={loader} /></div>
    return (
      <div className="mainContainer">
        <h1>Flower Check</h1>
        {
          roomSelected !== '' && <button onClick={()=>this.onRoomClicked('')}>back</button>
        }
        <button onClick={this.post}>Add flower</button>
        {
          roomSelected === '' && this.renderRooms()
        }
        {
          roomSelected !== '' && this.renderFlowers()
        }
      </div>
    );
  }
}

export default App;
