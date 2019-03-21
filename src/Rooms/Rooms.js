import React, { Component } from 'react';
import FadeIn from '../FadeIn/FadeIn';
import RoomCard from '../RoomCard/RoomCard';
import './Rooms.css';

class Rooms extends Component {

  renderRooms() {
    const { rooms } = this.props;
    return rooms.map((room)=> {
        return (
          <FadeIn key={room.id}>
            <RoomCard
              roomId={room.id}
              name={room.name}
            />
          </FadeIn>
        )
      })
    ;
  }

  render() {
    return (
      this.renderRooms()
    );
  }
}

export default Rooms;
