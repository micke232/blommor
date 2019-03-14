import React, { Component } from 'react';
import RoomCard from './RoomCard/RoomCard';
import FlowerCard from './FlowerCard/FlowerCard';
import AddFlowerModal from './AddFlowerModal/AddFlowerModal';
import AddRoomModal from './AddRoomModal/AddRoomModal';
import FadeIn from './FadeIn/FadeIn';
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
      const roomData = rooms.map((room)=> room.name);
      this.setState({ flowers, rooms: roomData })
     })
  }

  onRoomClicked = ( room ) => {
    this.update();
    this.setState({ roomSelected: room })

  }

  renderRooms() {
    const { rooms } = this.state;
    return rooms.map((room)=> {
        return (
          <FadeIn key={room}>
            <RoomCard
              onRoomClicked={this.onRoomClicked}
              name={room}
            />
          </FadeIn>
        )
      })
    ;
  }

  renderFlowers() {
    const { flowers, roomSelected } = this.state;
    return flowers.map((flower)=> {
      if(flower.room === roomSelected )  {
        return <FlowerCard progress={flower.interval * 10} key={flower.id} update={this.update} id={flower.id} name={flower.name} />
      } else return null;
    })
  }

  toggleModal = (event) => {
    const { flowerModalOpen, roomModalOpen } = this.state;
    if(!event) return this.setState({ flowerModalOpen: false, roomModalOpen: false });
    if (event.target.id === 'flower') this.setState({ flowerModalOpen: !flowerModalOpen, roomModalOpen: false })
    if (event.target.id === 'room') this.setState({ roomModalOpen: !roomModalOpen, flowerModalOpen: false })
  }

  render() {
    const {
      roomSelected,
      flowerModalOpen,
      roomModalOpen,
    } = this.state;
    return (
      <div className="mainContainer">
        <div className="header">
          <button className="addButton" id="flower" onClick={this.toggleModal}>Add flower</button>
          <br/>
          <br/>
          <button className="addButton" id="room" onClick={this.toggleModal}>Add room</button>
        </div>
        {
          flowerModalOpen && (
            <FadeIn>
              <AddFlowerModal
                toggleModal={this.toggleModal}
                update={this.update}
              />
            </FadeIn>
          )
        }
        {
          roomModalOpen && (
            <FadeIn>
              <AddRoomModal
                toggleModal={this.toggleModal}
                update={this.update}
              />
            </FadeIn>
          )
        }
        {
          roomSelected !== '' && <button className="addButton" onClick={()=>this.onRoomClicked('')} style={{marginTop: '16px'}}>back</button>
        }
        
        {
          !flowerModalOpen && !roomModalOpen && roomSelected === '' && this.renderRooms()
        }
        {
          !flowerModalOpen && !roomModalOpen && roomSelected !== '' && this.renderFlowers()
        }
      </div>
    );
  }
}

export default App;
