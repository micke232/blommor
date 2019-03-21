import React, { Component } from 'react';
import { navigate, Link } from "@reach/router";
import './AddFlower.css';
import fire from '../fire'

class AddFlower extends Component {

  state = {
    name: '',
    room: '',
    rooms: [],
    interval: 0,
    image: null,
  }

  async componentDidMount() {
    const rooms = await fire('rooms', 'GET');
    const roomData = rooms.map((room)=> {
        return { name: room.name, id: room.id }
      });
    const sortedRoomData = roomData.sort((a, b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    })
    this.setState({ rooms: sortedRoomData })
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

  getImage = async () => {
    const response = await fetch(this.state.image);
    const blobImage = await response.blob();
    return blobImage;
  }

  handlePicture = (e) => {
    this.setState({ image: URL.createObjectURL( e.target.files[0]) })
  }

  post = async () => {
    const { name, room, interval } = this.state;
    const { update } = this.props;
    const obj = {
      name: name,
      room: room,
      interval: interval,
      image: await this.getImage(),
      watered_latest: '324',
    };
    await fire('flowers', 'POST', obj)
    await update();
    navigate('/');
  }

  render() {
    const { name, rooms, interval, image } = this.state;
    return (
      <div className={`addFlowerContainer`}>
        <p>Name:</p>
        <input onChange={this.inputName} value={name}/>
        <br/>
        <br/>
        <label  className="button" htmlFor="file-input">Add flower image</label>
        <input id="file-input" className="addFlowerFile" type="file" name="image" accept="image/*" capture="environment" onInput={this.handlePicture}/>
        <br/>
        {
          image && <img alt="flower" src={image} style={{ width: '100px', height: 'auto'}}/> 
        }
        <br/>
        <br/>
        <p>Room:</p>
        <select value={this.state.room} onChange={this.handleChange}>
          <option value=''></option>
          {rooms.map((room)=>{
            return <option value={room.id} key={room.id}>{room.name}</option>
          })}
        </select>
        <p>Interval:</p>
        <input onChange={this.inputInterval} value={interval}/>
        <br/>
        <button className="button" onClick={this.post}>Add Flower</button>
        <br/>
        <Link to="/" className="button" >Close</Link>
      </div>
    );
  }
}

export default AddFlower;
