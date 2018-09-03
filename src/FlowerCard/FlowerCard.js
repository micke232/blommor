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
      <img src="https://www.istockphoto.com/se/foto/anemone-blommor-i-blom-gm845538942-138594797"></img>
        {name}
        <div>
          <button className="flowerCardButton">Watered</button>
          <button className="flowerCardButton" onClick={this.deleteFlower}>Delete</button>
        </div>
      </div>
    );
  }
}

export default FlowerCard;
