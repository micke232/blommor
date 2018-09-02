import React, { Component } from 'react';
import './RoomCard.css';

class RoomCard extends Component {

  handleRoomCardClick = () => {
    const { name, onRoomClicked } = this.props;
    onRoomClicked(name)
  }


  render() {
    const { name } = this.props;
    return (
      <div className="roomCardContainer" onClick={this.handleRoomCardClick}>
        {name}
      </div>
    );
  }
}

export default RoomCard;
