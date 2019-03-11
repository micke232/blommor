import React from 'react';
import './Progressbar.css'
const Progressbar = (props) => (<div className="Progressbar" style={{ width: `${props.progress}%`}} ></div>)

export default Progressbar;
