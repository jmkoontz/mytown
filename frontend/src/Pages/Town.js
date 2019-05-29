import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import '../Static/CSS/Home.css';

class Town extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      county: '',
      state: '',
      population: 0,
      median_income: 0,
      adjusted_median_income: 0,
      cost_of_living: 0,
      land_area: 0,
      crime_index: 0,

      popRankCounty: '',
      incRankCounty: '',
      adjIncRankCounty: '',
      colRankCounty: '',
      popRankState: '',
      incRankState: '',
      adjIncRankState: '',
      colRankState: '',
      popRankOverall: '',
      incRankOverall: '',
      adjIncRankOverall: '',
      colRankOverall: '',

      visible: false,
      message: ''
    };
  }

  componentDidMount() {
    this.getTownData();
  }

  getTownData = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let self = this;
    axios.get(`http://localhost:3001/MyTown/Town/${this.props.town}/${this.props.county}/${this.props.state}`)
      .then((result) => {
        let town = JSON.parse(result.data);
        town = town[0];

        self.setState({
          name: town.name,
          county: town.county,
          state: town.state,
          population: town.population.toLocaleString(),
          median_income: formatter.format(town.median_income),
          adjusted_median_income: formatter.format(town.adj_income),
          cost_of_living: town.cost_of_living,
          land_area: (town.land_area || 'N/A'),
          crime_index: (town.crime_index || 'N/A')
        });
      }).then(() => {
        self.getRanks('county');
        self.getRanks('state');
        self.getRanks('overall');
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
  };

  getRanks = (type) => {
    let self = this;
    axios.get(`http://localhost:3001/MyTown/Rank/Town/${this.props.town}/${this.props.county}/${this.props.state}/${type}`)
      .then((result) => {
        let town = JSON.parse(result.data);
        town = town[0];

        if (type === 'county') {
          self.setState({
            popRankCounty: town.popRank,
            incRankCounty: town.incRank,
            adjIncRankCounty: town.adjIncRank,
            colRankCounty: town.colRank
          });
        } else if (type === 'state') {
          self.setState({
            popRankState: town.popRank.toLocaleString(),
            incRankState: town.incRank.toLocaleString(),
            adjIncRankState: town.adjIncRank.toLocaleString(),
            colRankState: town.colRank.toLocaleString()
          });
        } else if (type === 'overall') {
          self.setState({
            popRankOverall: town.popRank.toLocaleString(),
            incRankOverall: town.incRank.toLocaleString(),
            adjIncRankOverall: town.adjIncRank.toLocaleString(),
            colRankOverall: town.colRank.toLocaleString()
          });
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
  };

  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <Container>
        <Alert color='primary' isOpen={this.state.visible} toggle={this.onDismiss}>
          {this.state.message}
        </Alert>
        <Row>
          <Col>
            <p>
              <span>Name: </span>
              <span className='resultText'>{this.state.name}</span>
            </p>
            <div>County:{' '}
              <NavLink to={`/MyTown/County/${this.state.county}/${this.state.state}`}
                  style={{textDecoration: 'none', display: 'inline-block'}}>
                <p className='navText resultText'>{this.state.county}</p>
              </NavLink>
            </div>
            <div>State:{' '}
              <NavLink to={`/MyTown/State/${this.state.state}`}
                  style={{textDecoration: 'none', display: 'inline-block'}}>
                <p className='navText resultText'>{this.state.state}</p>
              </NavLink>
            </div>
            <p>
              <span>Population: </span>
              <span className='resultText'>{this.state.population} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.popRankCounty} </span>
              <span>in {this.state.county} County, #</span>
              <span className='resultText'>{this.state.popRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.popRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Median Income: </span>
              <span className='resultText'>{this.state.median_income} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.incRankCounty} </span>
              <span>in {this.state.county} County, #</span>
              <span className='resultText'>{this.state.incRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.incRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Adjusted Median Income: </span>
              <span className='resultText'>{this.state.adjusted_median_income} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.adjIncRankCounty} </span>
              <span>in {this.state.county} County, #</span>
              <span className='resultText'>{this.state.adjIncRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.adjIncRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Cost of Living: </span>
              <span className='resultText'>{this.state.cost_of_living} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.colRankCounty} </span>
              <span>in {this.state.county} County, #</span>
              <span className='resultText'>{this.state.colRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.colRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Land Area: </span>
              <span className='resultText'>{this.state.land_area}</span>
            </p>
            <p>
              <span>Crime Index: </span>
              <span className='resultText'>{this.state.crime_index}</span>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Town;
