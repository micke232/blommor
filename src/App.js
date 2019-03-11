import React, { Component } from 'react';
import RoomCard from './RoomCard/RoomCard';
import FlowerCard from './FlowerCard/FlowerCard';
import AddFlowerModal from './AddFlowerModal/AddFlowerModal';
import FadeIn from './FadeIn/FadeIn';
import fire from './fire'
import './App.css';

class App extends Component {

  state = {
    roomSelected: '',
    rooms: [],
    flowers: [],
    modalOpen: false,
  }

  componentDidMount() {
    this.update();
  }

  update = () => {
    fire('flowers', 'GET').then((data)=>{
      const rooms = [];
      data.forEach((room) => {
        const checkIfExist = rooms.find((unique)=> unique === room.room)
        if (!checkIfExist) {
          rooms.push(room.room)
        }
      });
      this.setState({ flowers: data, rooms })
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

  toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen })
  }

  render() {
    const { roomSelected, modalOpen } = this.state;
    return (
      <div className="mainContainer">
        <div className="header">
          <button className="addButton" onClick={this.toggleModal}>Add flower</button>
        </div>
        {
          modalOpen && (
            <FadeIn>
              <AddFlowerModal
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
