import React, { Component } from 'react';
import './AddFlowerModal.css';

class AddFlowerModal extends Component {

  state = {
    open: false,
  }

  render() {
    const { name } = this.props;
    return (
      <div className="addFlowerModalContainer">
        {name}
      </div>
    );
  }
}

export default AddFlowerModal;
