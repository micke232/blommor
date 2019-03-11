import React, { Component } from 'react';
import './AddFlowerModal.css';
import fire from '../fire'

class AddFlowerModal extends Component {

  state = {
    name: '',
    room: '',
    interval: 0,
    image: 'http://',
  }

  closeModal = () => {
    this.props.toggleModal();
  }

  inputName = (e) => {
    this.setState({ name: e.target.value })
  }
  
  inputRoom = (e) => {
    this.setState({ room: e.target.value })
  }
  
  inputInterval = (e) => {
    this.setState({ interval: e.target.value })
  }
  
  inputImage = (e) => {
    this.setState({ image: e.target.value })
  }

  post = () => {
    const { name, room, interval, image } = this.state;
    const obj = {
      name: name,
      room: room,
      interval: interval,
      image: image,
      watered_latest: '324',
    };
    fire('flowers', 'POST', obj)
    this.closeModal();
    this.props.update();
  }

  render() {
    const { name, room, interval, image } = this.state;
    return (
      <div className={`addFlowerModalContainer`}>
          <p>Name:</p>
          <input onChange={this.inputName} value={name}/>
          <p>Room:</p>
          <input onChange={this.inputRoom} value={room}/>
          <p>Interval:</p>
          <input onChange={this.inputInterval} value={interval}/>
          <p>Image Link:</p>
          <input onChange={this.inputImage} value={image}/>
          <br/>
          <button class="modalButton" onClick={this.post}>Add Flower</button>
          <br/>
          <button class="modalButton" onClick={this.closeModal}>Close</button>
      </div>
    );
  }
}

export default AddFlowerModal;
