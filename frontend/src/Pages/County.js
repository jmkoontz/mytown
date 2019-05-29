import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import TownTable from '../Components/TownTable';

import '../Static/CSS/Home.css';

class County extends Component {
  constructor(props) {
    super(props);

    this.state = {
      county: '',
      state: '',
      num_towns: 0,
      population: 0,
      median_income: 0,
      adjusted_median_income: 0,
      cost_of_living: 0,

      countRankState: '',
      popRankState: '',
      incRankState: '',
      adjIncRankState: '',
      colRankState: '',
      countRankOverall: '',
      popRankOverall: '',
      incRankOverall: '',
      adjIncRankOverall: '',
      colRankOverall: '',

      townList: [],

      visible: false,
      message: ''
    };
  }

  componentDidMount() {
    this.getCountyData();
  }

  getCountyData = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let self = this;
    axios.get(`http://localhost:3001/MyTown/County/${this.props.county}/${this.props.state}`)
      .then((result) => {
        let county = JSON.parse(result.data);
        county = county[0];

        self.setState({
          county: county.county,
          state: county.state,
          num_towns: county.num_towns.toLocaleString(),
          population: county.sum_population.toLocaleString(),
          median_income: formatter.format(county.avg_income),
          adjusted_median_income: formatter.format(county.avg_adj_income),
          cost_of_living: Math.round(county.avg_cost_of_living * 100) / 100
        });
      }).then(() => {
        self.getRanks('state');
        self.getRanks('overall');
        self.getTownsInCounty();
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
    axios.get(`http://localhost:3001/MyTown/Rank/County/${this.props.county}/${this.props.state}/${type}`)
      .then((result) => {
        let county = JSON.parse(result.data);
        county = county[0];

        if (type === 'state') {
          self.setState({
            countRankState: county.countRank.toLocaleString(),
            popRankState: county.popRank.toLocaleString(),
            incRankState: county.incRank.toLocaleString(),
            adjIncRankState: county.adjIncRank.toLocaleString(),
            colRankState: county.colRank.toLocaleString()
          });
        } else if (type === 'overall') {
          self.setState({
            countRankOverall: county.countRank.toLocaleString(),
            popRankOverall: county.popRank.toLocaleString(),
            incRankOverall: county.incRank.toLocaleString(),
            adjIncRankOverall: county.adjIncRank.toLocaleString(),
            colRankOverall: county.colRank.toLocaleString()
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

  getTownsInCounty = () => {
    let self = this;
    axios.get(`http://localhost:3001/MyTown/Towns?county=${this.props.county}&state=${this.props.state}`)
      .then((result) => {
        let results = JSON.parse(result.data);

        let resultsArr = [];
        for (let i in results) {
          resultsArr.push({
            town: results[i].name,
            county: results[i].county,
            state: results[i].state,
            population: results[i].population,
            median_income: results[i].median_income,
            adjusted_median_income: results[i].adj_income,
            cost_of_living: results[i].cost_of_living,
            land_area: (results[i].land_area || 'N/A'),
            crime_index: (results[i].crime_index || 'N/A')
          });
        }

        self.setState({townList: resultsArr});
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
              <span>County: </span>
              <span className='resultText'>{this.state.county}</span>
            </p>
            <div>State:{' '}
              <NavLink to={`/MyTown/State/${this.state.state}`}
                  style={{textDecoration: 'none', display: 'inline-block'}}>
                <p className='navText resultText'>{this.state.state}</p>
              </NavLink>
            </div>
            <p>
              <span>Number of Towns: </span>
              <span className='resultText'>{this.state.num_towns} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.countRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.countRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Total Population: </span>
              <span className='resultText'>{this.state.population} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.popRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.popRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Average Median Income: </span>
              <span className='resultText'>{this.state.median_income} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.incRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.incRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Average Adjusted Median Income: </span>
              <span className='resultText'>{this.state.adjusted_median_income} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.adjIncRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.adjIncRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Average Cost of Living: </span>
              <span className='resultText'>{this.state.cost_of_living} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.colRankState} </span>
              <span>in {this.state.state}, #</span>
              <span className='resultText'>{this.state.colRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <TownTable towns={this.state.townList} page={'county'}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default County;
