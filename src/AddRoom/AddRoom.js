import React, { Component } from 'react';
import './AddRoom.css';
import { navigate, Link } from "@reach/router";
import fire from '../fire'
import makeid from '../Utils/makeID';

class AddRoom extends Component {

  state = {
    room: '',
  }

  inputRoom = (e) => {
    this.setState({ room: e.target.value })
  }

  post = async () => {
    const { room } = this.state;
    const { update } = this.props;
    const obj = {
      name: room,
      roomId: makeid(10),
    };
    await fire('rooms', 'POST', obj)
    await update();
    navigate('/');
  }

  render() {
    const { room } = this.state;
    return (
      <div className={`addRoomContainer`}>
        <p>Room:</p>
        <input onChange={this.inputRoom} value={room}/>
        <br/>
        <button className="button" onClick={this.post}>Add Room</button>
        <br/>
        <Link to="/" className="button">Close</Link>
      </div>
    );
  }
}

export default AddRoom;
