import React, { Component } from 'react';
import { Container, Row, Col, Alert, ButtonGroup, Button } from 'reactstrap';
import axios from 'axios';

import TownTable from '../Components/TownTable';
import CountyTable from '../Components/CountyTable';

import '../Static/CSS/Home.css';

class State extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: '',
      num_towns: 0,
      population: 0,
      median_income: 0,
      adjusted_median_income: 0,
      cost_of_living: 0,

      townCountRankOverall: '',
      countyCountRankOverall: '',
      popRankOverall: '',
      incRankOverall: '',
      adjIncRankOverall: '',
      colRankOverall: '',

      townList: [],
      countyList: [],

      mode: 'county',
      visible: false,
      message: ''
    };
  }

  componentDidMount() {
    this.getStateData();
  }

  toggleMode = (selected) => {
    this.setState({mode: selected});
  };

  getStateData = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let self = this;
    axios.get(`http://localhost:3001/MyTown/State/${this.props.state}`)
      .then((result) => {
        let state = JSON.parse(result.data);
        state = state[0];

        self.setState({
          state: state.state,
          num_towns: state.num_towns.toLocaleString(),
          num_counties: state.num_counties.toLocaleString(),
          population: state.sum_population.toLocaleString(),
          median_income: formatter.format(state.avg_income),
          adjusted_median_income: formatter.format(state.avg_adj_income),
          cost_of_living: Math.round(state.avg_cost_of_living * 100) / 100
        });
      }).then(() => {
        self.getRanks('overall');
        self.getCountiesInState();
        self.getTownsInState();
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

  getRanks = () => {
    let self = this;
    axios.get(`http://localhost:3001/MyTown/Rank/State/${this.props.state}`)
      .then((result) => {
        let state = JSON.parse(result.data);
        state = state[0];

        self.setState({
          townCountRankOverall: state.townCountRank,
          countyCountRankOverall: state.countyCountRank,
          popRankOverall: state.popRank,
          incRankOverall: state.incRank,
          adjIncRankOverall: state.adjIncRank,
          colRankOverall: state.colRank
        });
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

  getTownsInState = () => {
    let self = this;
    axios.get(`http://localhost:3001/MyTown/Towns?state=${this.props.state}`)
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

  getCountiesInState = () => {
    let self = this;
    axios.get(`http://localhost:3001/MyTown/Counties?state=${this.props.state}`)
      .then((result) => {
        let results = JSON.parse(result.data);

        let resultsArr = [];
        for (let i in results) {
          resultsArr.push({
            county: results[i].county,
            state: results[i].state,
            num_towns: results[i].num_towns,
            population: results[i].sum_population,
            median_income: results[i].avg_income,
            adjusted_median_income: results[i].avg_adj_income,
            cost_of_living: results[i].avg_cost_of_living
          });
        }

        self.setState({countyList: resultsArr});
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
              <span>State: </span>
              <span className='resultText'>{this.state.state}</span>
            </p>
            <p>
              <span>Number of Towns: </span>
              <span className='resultText'>{this.state.num_towns} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.townCountRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Number of Counties: </span>
              <span className='resultText'>{this.state.num_counties} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.countyCountRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Total Population: </span>
              <span className='resultText'>{this.state.population} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.popRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Average Median Income: </span>
              <span className='resultText'>{this.state.median_income} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.incRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Average Adjusted Median Income: </span>
              <span className='resultText'>{this.state.adjusted_median_income} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.adjIncRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
            <p>
              <span>Average Cost of Living: </span>
              <span className='resultText'>{this.state.cost_of_living} </span>
              <span>(#</span>
              <span className='resultText'>{this.state.colRankOverall} </span>
              <span>in the U.S.)</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={{size: 2, offset: 10}}>
            <ButtonGroup>
              <Button onClick={() => this.toggleMode('county')} active={this.state.mode === 'county'}>County</Button>
              <Button onClick={() => this.toggleMode('state')} active={this.state.mode === 'state'}>State</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          {
            (this.state.mode === 'county')
              ?
              <Col>
                <CountyTable counties={this.state.countyList} />
              </Col>
              :
              <Col>
                <TownTable towns={this.state.townList} page={'state'} />
              </Col>
          }
        </Row>
      </Container>
    );
  }
}

export default State;
