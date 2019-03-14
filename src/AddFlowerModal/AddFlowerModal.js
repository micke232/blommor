import React, { Component } from 'react';
import './AddFlowerModal.css';
import fire from '../fire'

class AddFlowerModal extends Component {

  state = {
    name: '',
    room: '',
    rooms: [],
    interval: 0,
    image: null,
  }

  async componentDidMount() {
    const rooms = await fire('rooms', 'GET');
    const roomData = rooms.map((room)=>{
      return room.name;
    })
    this.setState({ rooms: roomData })
  }

  closeModal = () => {
    this.props.toggleModal();
  }

  inputName = (e) => {
    this.setState({ name: e.target.value })
  }
  
  handleChange = (e) => {
    this.setState({ room: e.target.value })
  }
  
  inputInterval = (e) => {
    this.setState({ interval: e.target.value })
  }

  getImage = async (e) => {
    const response = await fetch(this.state.image);
    const blobImage = await response.blob();
    return blobImage;
  }

  handlePicture = (e) => {
    this.setState({ image: URL.createObjectURL( e.target.files[0]) })
  }

  post = async () => {
    const { name, room, interval } = this.state;
    const obj = {
      name: name,
      room: room,
      interval: interval,
      image: await this.getImage(),
      watered_latest: '324',
    };
    fire('flowers', 'POST', obj)
    this.closeModal();
    this.props.update();
  }

  render() {
    const { name, rooms, interval, image } = this.state;
    return (
      <div className={`addFlowerModalContainer`}>
        <p>Name:</p>
        <input onChange={this.inputName} value={name}/>
        <br/>
        <br/>
        <label  className="modalButton" for="file-input">Add flower image</label>
        <input id="file-input" className="addFlowerFile" type="file" name="image" accept="image/*" capture="environment" onInput={this.handlePicture}/>
        <br/>
        {
          image && <img src={image} style={{ width: '100px', height: 'auto'}}/> 
        }
        <br/>
        <br/>
        <p>Room:</p>
        <select value={this.state.room} onChange={this.handleChange}>
          <option value=''></option>
          {rooms.map((room)=>{
            return <option value={room} key={room}>{room}</option>
          })}
        </select>
        <p>Interval:</p>
        <input onChange={this.inputInterval} value={interval}/>
        <br/>
        <button className="modalButton" onClick={this.post}>Add Flower</button>
        <br/>
        <button className="modalButton" onClick={this.closeModal}>Close</button>
      </div>
    );
  }
}

export default AddFlowerModal;
