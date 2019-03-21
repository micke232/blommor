import React, { Component } from 'react';
import { Link } from "@reach/router";
import './RoomCard.css';

class RoomCard extends Component {

  render() {
    const { name, roomId } = this.props;
    return (
      <Link to={`${name}`} state={{ roomId: roomId }} className="roomCardContainer">
          {name}
      </Link>
    );
  }
}

export default RoomCard;
