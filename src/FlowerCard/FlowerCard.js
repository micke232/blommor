import React, { Component } from 'react';
import './FlowerCard.css';
import fire from '../fire'
import Progressbar from '../Progressbar/Progressbar';

class FlowerCard extends Component {

  deleteFlower = () => {
    const { id } = this.props;
    const obj = {
      id: id
    };
    fire('flowers', 'DELETE', obj)
    this.props.update();
  }


  render() {
    const { name, progress } = this.props;
    return (
      <div className="flowerCardContainer" onClick={this.handleFlowerCardClick}>
        <span style={{color: 'white', marginBottom: '20px'}}>{name}</span>
          <br/>
        <div>
          <button className="flowerCardButton">Watered</button>
          <br/>
          <button className="flowerCardButton" onClick={this.deleteFlower}>Delete</button>
        </div>
          <br/>
        <span style={{ color: 'white' }}>{progress} % hydrated</span>
          <br/>
        <Progressbar progress={progress}/>
      </div>
    );
  }
}

export default FlowerCard;
