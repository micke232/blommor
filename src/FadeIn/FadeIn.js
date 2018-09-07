import React, { Component } from 'react';
import './FadeIn.css';

class FadeIn extends Component {
  state = {
    fadeIn: false
  }  

  componentDidMount() {
    this.fadeIn = setTimeout(() => {
        this.setState({fadeIn: true})
      }, 10);
  }

  componentWillUnmount(){
    clearTimeout(this.fadeIn);
  }

  render() {
    const { fadeIn } = this.state;
    return (
      <div className={`animate ${fadeIn && 'fadeIn'}`}>
        {this.props.children}
      </div>
    );
  }
}

export default FadeIn;
