import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import '../Static/CSS/NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Row className='background'>
        <Col className='titleCol' xs='2'>
          <NavLink to={'/MyTown/Home'} style={{textDecoration: 'none'}}>
            <b className='title'>MyTown</b>
          </NavLink>
        </Col>
        <Col xs='7'/>
        <Col className='navCol'>
          <NavLink to={'/MyTown/Leaderboards'} style={{textDecoration: 'none'}}>
            <b className='navBarText'>Leaderboards</b>
          </NavLink>
        </Col>
        <Col className='navCol'>
          <NavLink to={'/MyTown/About'} style={{textDecoration: 'none'}}>
            <b className='navBarText'>About</b>
          </NavLink>
        </Col>
      </Row>
    );
  }
}

export default NavBar;
