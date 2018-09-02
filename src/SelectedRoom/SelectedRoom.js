import React, { Component } from 'react';
import './SelectedRoom.css';

class SelectedRoom extends Component {

  handleSelectedRoomClick = () => {
    const { name, onFloweClicked } = this.props;
    onFloweClicked(name)
  }


  render() {
    const { name } = this.props;
    return (
      <div className="SelectedRoomContainer" onClick={this.handleSelectedRoomClick}>
        {name}
      </div>
    );
  }
}

export default SelectedRoom;
