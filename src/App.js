import React, { Component } from 'react';
import RoomCard from './RoomCard/RoomCard';
import FlowerCard from './FlowerCard/FlowerCard';
import AddFlowerModal from './AddFlowerModal/AddFlowerModal';
import FadeIn from './FadeIn/FadeIn';
import fire from './fire'
import loader from './loader.gif'
import Colors from 'color-scheme';
import './App.css';

class App extends Component {

  state = {
    roomSelected: '',
    rooms: [],
    flowers: [],
    modalOpen: false,
    init: false,
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
      this.setState({ flowers: data, rooms, init: true })
     })
  }

  onRoomClicked = ( room ) => {
    this.update();
    this.setState({ roomSelected: room })

  }

  renderRooms() {
    const { rooms } = this.state;
    const scm = new Colors;
    scm.from_hex('1d9207')
      .scheme('triade')
      .distance(0.1)
      .variation('pastel')
      .web_safe(true);

    const colors = scm.colors();
    return rooms.map((room, index)=> {
        return (
          <FadeIn key={room + colors[index]}>
            <RoomCard
              color={colors[index]}
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
        return <FlowerCard key={flower.id} update={this.update} id={flower.id} name={flower.name} />
      } else return null;
    })
  }

  toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen })
  }

  render() {
    const { roomSelected, init, modalOpen } = this.state;
    if (!init) return <div className="mainContainer"><img src={loader} /></div>
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
