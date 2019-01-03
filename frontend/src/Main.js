import React, { Component } from 'react';

import './Static/CSS/Main.css';

import NavBar from './Components/NavBar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className='navbar-fixed'>
          <NavBar />
        </div>
        <div className='content'>
          <this.props.component town={this.props.town} county={this.props.county}
              state={this.props.state} />
        </div>
      </div>
    );
  }
}

export default Main;
