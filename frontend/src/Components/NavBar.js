import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import '../Static/CSS/NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Row>
        <Col className='title' sm='2'>
          <NavLink to={'/MyTown/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>MyTown</b>
          </NavLink>
        </Col>

        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/MyTown/About'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>About</b>
          </NavLink>
        </Col>
        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/MyTown/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>MyTown</b>
          </NavLink>
        </Col>

        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/MyTown/About'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>About</b>
          </NavLink>
        </Col>
        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/MyTown/Home'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>MyTown</b>
          </NavLink>
        </Col>

        <Col className='navText' sm='1' md='1'>
          <NavLink to={'/MyTown/About'} style={{textDecoration: 'none'}}>
            <b className='navText' style={{fontSize: '1em'}}>About</b>
          </NavLink>
        </Col>
      </Row>
    )
  }
}

export default NavBar;
