import React, { Component } from 'react';
import './FlowerCard.css';

class FlowerCard extends Component {

  deleteFlower = () => {
    const { id } = this.props;
    // do api delete
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
