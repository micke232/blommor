import React, { Component } from 'react';
import './AddRoomModal.css';
import fire from '../fire'

class AddRoomModal extends Component {

  state = {
    room: '',
  }

  closeModal = () => {
    this.props.toggleModal();
  }

  inputRoom = (e) => {
    this.setState({ room: e.target.value })
  }

  post = () => {
    const { room } = this.state;
    const obj = {
      name: room,
    };
    fire('rooms', 'POST', obj)
    this.closeModal();
    this.props.update();
  }

  render() {
    const { room } = this.state;
    return (
      <div className={`addRoomModalContainer`}>
        <p>Room:</p>
        <input onChange={this.inputRoom} value={room}/>
        <br/>
        <button className="modalButton" onClick={this.post}>Add Room</button>
        <br/>
        <button className="modalButton" onClick={this.closeModal}>Close</button>
      </div>
    );
  }
}

export default AddRoomModal;
