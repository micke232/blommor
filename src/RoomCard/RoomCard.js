import React, { Component } from 'react';
import './RoomCard.css';
import door from '../door.png'
class RoomCard extends Component {

  handleRoomCardClick = () => {
    const { name, onRoomClicked } = this.props;
    onRoomClicked(name)
  }


  render() {
    const { name } = this.props;
    return (
      <div className="roomCardContainer" onClick={this.handleRoomCardClick}>
        <div className="iconHolder">
          <img className="doorIcon" src={door}/>
        </div>
        <div>
          {name}
        </div>
      </div>
    );
  }
}

export default RoomCard;
