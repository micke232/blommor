import React, { Component } from 'react';
import FlowerCard from '../FlowerCard/FlowerCard';
import './SelectedRoom.css';

class SelectedRoom extends Component {

  renderFlowers = (flowers, roomId) => {
    return flowers.map((flower)=> {
      if (flower.room !== roomId) return null;
      return <FlowerCard imagePath={flower.imagePath} progress={flower.interval * 10} key={flower.id} update={this.update} id={flower.id} name={flower.name} />
    })
  }
  
  render() {
    const { roomName, flowers } = this.props;
    const roomId = this.props.location.state.roomId;
    return (
      <div className="SelectedRoomContainer" onClick={this.handleSelectedRoomClick}>
        {roomName}
        {this.renderFlowers(flowers, roomId)}
      </div>
    );
  }
}

export default SelectedRoom;
