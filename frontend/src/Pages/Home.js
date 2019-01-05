import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button,
    ButtonGroup, Alert } from 'reactstrap';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

import '../Static/CSS/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      message: '',
      mode: 'town',

      town: '',
      county: '',
      state: '',

      specific: true,
      searchResults: []
    };
  }

  toggleMode = (selected) => {
    this.setState({
      mode: selected,
      searchResults: []
    });
  };

  onSubmit = (ev) => {
    this.setState({
      visible: false,
      searchResults: []
    });

    ev.preventDefault();
    let target = ev.target;

    let specific = true;
    if ((this.state.mode === 'town' && (target.town.value === ''
        || target.county.value === ''
        || target.state.value === '--Please Select State--'))
        || (this.state.mode === 'county' && (target.county.value === ''
        || target.state.value === '--Please Select State--'))) {
      specific = false;
    }

    if ((this.state.mode === 'town' && target.town.value === ''
        && target.county.value === '' && target.state.value === '--Please Select State--')
        || (this.state.mode === 'county' && target.county.value === ''
        && target.state.value === '--Please Select State--') || (this.state.mode === 'state'
        && target.state.value === '--Please Select State--')) {
      this.setState({
        visible: true,
        message: 'Please fill out at least one field'
      });
    } else {
      let url = `http://localhost:3001/MyTown/`;

      if (this.state.mode === 'town') {
        if (specific)
          url += `Town/${target.town.value}/${target.county.value}/${target.state.value}`;
        else {
          url += `Towns?town=${target.town.value}&county=${target.county.value}`;

          if (target.state.value !== '--Please Select State--')
            url += `&state=${target.state.value}`;
        }
      } else if (this.state.mode === 'county') {
        if (specific)
          url += `County/${target.county.value}/${target.state.value}`;
        else {
          url += `Counties?county=${target.county.value}`;

          if (target.state.value !== '--Please Select State--')
            url += `&state=${target.state.value}`;
        }
      } else if (this.state.mode === 'state') {
        url += `State/${target.state.value}`;
      }

      let self = this;
      axios.get(url)
        .then((result) => {
          let results = JSON.parse(result.data);

          if (specific && results.length === 1) {
            self.setState({
              town: target.town.value,
              county: target.county.value,
              state: target.state.value
            });
          } else {
            let resultsArr = [];
            for (let i in results) {
              if (this.state.mode === 'town') {
                resultsArr.push({
                  town: results[i].name,
                  county: results[i].county,
                  state: results[i].state
                });
              } else if (this.state.mode === 'county'){
                resultsArr.push({
                  county: results[i].county,
                  state: results[i].state
                });
              }
            }

            self.setState({searchResults: resultsArr});
          }
        }).catch((error) => {
          if (error.response && error.response.data) {
            self.setState({
              visible: true,
              message: error.response.data.error.message
            });
          } else {
            self.setState({
              visible: true,
              message: 'Network error, please try again'
            });
          }
        });
    }
  };

  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    const stateList =
      <Input type='select' id='state' name='state'>
        <option>--Please Select State--</option>
        <option>Alabama</option><option>Alaska</option><option>Arizona</option>
        <option>Arkansas</option><option>California</option><option>Colorado</option>
        <option>Connecticut</option><option>Delaware</option><option>Florida</option>
        <option>Georgia</option><option>Hawaii</option><option>Idaho</option>
        <option>Illinois</option><option>Indiana</option><option>Iowa</option>
        <option>Kansas</option><option>Kentucky</option><option>Louisiana</option>
        <option>Maine</option><option>Maryland</option><option>Massachusetts</option>
        <option>Michigan</option><option>Minnesota</option><option>Mississippi</option>
        <option>Missouri</option><option>Montana</option><option>Nebraska</option>
        <option>Nevada</option><option>New Hampshire</option><option>New Jersey</option>
        <option>New Mexico</option><option>New York</option><option>North Carolina</option>
        <option>North Dakota</option><option>Ohio</option><option>Oklahoma</option>
        <option>Oregon</option><option>Pennsylvania</option><option>Rhode Island</option>
        <option>South Carolina</option><option>South Dakota</option><option>Tennessee</option>
        <option>Texas</option><option>Utah</option><option>Vermont</option>
        <option>Virginia</option><option>Washington</option><option>West Virginia</option>
        <option>Wisconsin</option><option>Wyoming</option>
      </Input>;

    if (this.state.town.length > 0)
      return <Redirect to={`/MyTown/Town/${this.state.town}/${this.state.county}/${this.state.state}`} />
    else if (this.state.county.length > 0)
      return <Redirect to={`/MyTown/County/${this.state.county}/${this.state.state}`} />
    else if (this.state.state.length > 0)
      return <Redirect to={`/MyTown/State/${this.state.state}`} />

    return (
      <Container>
        <Row>
          <Col xs={{size: 4, offset: 4}}>
            <ButtonGroup>
              <Button onClick={() => this.toggleMode('town')} active={this.state.mode === 'town'}>Town</Button>
              <Button onClick={() => this.toggleMode('county')} active={this.state.mode === 'county'}>County</Button>
              <Button onClick={() => this.toggleMode('state')} active={this.state.mode === 'state'}>State</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={{size: 4, offset: 4}}>
            <br/>
            <Form onSubmit={this.onSubmit}>
              <FormGroup row hidden={this.state.mode !== 'town'}>
                <Label for='town' xs='2'>Town</Label>
                <Col>
                  <Input id='town' name='town' />
                </Col>
              </FormGroup>
              <FormGroup row hidden={this.state.mode === 'state'}>
                <Label for='county' xs='2'>County</Label>
                <Col>
                  <Input id='county' name='county' />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='state' xs='2'>State</Label>
                <Col>
                  {stateList}
                </Col>
              </FormGroup>
              <Col xs={{offset: 9}}>
                <Button>Search</Button>
              </Col>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={{size: '4', offset: '4'}}>
            <br/>
            <Alert color='primary' isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>
            {
              (this.state.searchResults.length === 0)
                ?
                <p></p>
                :
                (this.state.searchResults.length === 1)
                  ?
                  <p>{this.state.searchResults.length} result found:</p>
                  :
                  <p>{this.state.searchResults.length} results found:</p>
            }
            {
              this.state.searchResults.map((item, index) => {
                if (this.state.mode === 'town') {
                  return (
                    <NavLink to={`/MyTown/Town/${item.town}/${item.county}/${item.state}`}
                        style={{textDecoration: 'none'}}>
                      <p key={index} className='navText'>{item.town}, {item.state} ({item.county} County)</p>
                    </NavLink>
                  );
                } else {
                  return (
                    <NavLink to={`/MyTown/County/${item.county}/${item.state}`}
                        style={{textDecoration: 'none'}}>
                      <p key={index} className='navText'>{item.county} County, {item.state}</p>
                    </NavLink>
                  );
                }
              })
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
