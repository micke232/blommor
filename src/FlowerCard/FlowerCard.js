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
        {name}
        <button>Watered</button>
        <button onClick={this.deleteFlower}>Delete</button>
      </div>
    );
  }
}

export default FlowerCard;
