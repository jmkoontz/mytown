import React, { Component } from 'react';

import NavBar from './Components/NavBar';

import './Static/CSS/Main.css';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar />
        </div>


      </div>
    )
  }
}

export default Main;
