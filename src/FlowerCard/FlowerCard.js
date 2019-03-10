import React, { Component } from 'react';
import './FlowerCard.css';
import fire from '../fire'

class FlowerCard extends Component {

  deleteFlower = () => {
    const { id } = this.props;
    const obj = {
      id: id
    };
    fire('flowers', 'DELETE', obj)
    console.log(id)
    this.props.update();
  }


  render() {
    const { name } = this.props;
    return (
      <div className="flowerCardContainer" onClick={this.handleFlowerCardClick}>
        <img src="https://via.placeholder.com/50"/>
        <br/>
        <span style={{color: 'white', marginBottom: '10px'}}>{name}</span>
        <div>
          <button className="flowerCardButton">Watered</button>
          <br/>
          <button className="flowerCardButton" onClick={this.deleteFlower}>Delete</button>
        </div>
      </div>
    );
  }
}

export default FlowerCard;
