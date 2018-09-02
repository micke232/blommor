import React, { Component } from 'react';
import './FlowerCard.css';

class FlowerCard extends Component {

  handleFlowerCardClick = () => {
    const { name, onFloweClicked } = this.props;
    onFloweClicked(name)
  }


  render() {
    const { name } = this.props;
    return (
      <div className="FlowerCardContainer" onClick={this.handleFlowerCardClick}>
        {name}
      </div>
    );
  }
}

export default FlowerCard;
