import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import axios from 'axios';

import TownTable from '../Components/TownTable';
import CountyTable from '../Components/CountyTable';
import StateTable from '../Components/StateTable';

class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      county: '',
      state: '',
      num_towns: 0,
      num_counties: 0,
      population: 0,
      median_income: 0,
      adjusted_median_income: 0,
      cost_of_living: 0,

      category: '--Please Select Category--',
      mode: 'town',
      scope: 'overall',
      results: [],

      visible: false,
      message: ''
    };
  }

  getLeaderboardData = (ev) => {
    this.setState({
      visible: false,
      results: []
    });

    ev.preventDefault();
    let target = ev.target;

    let category = target.category.value;
    if (target.category.value === 'Population')
      category = 'population';
    else if (target.category.value === 'Median Income')
      category = 'median_income';
    else if (target.category.value === 'Adjusted Median Income')
      category = 'adj_income';
    else if (target.category.value === 'Cost of Living')
      category = 'cost_of_living';
    else if (target.category.value === 'Land Area')
      category = 'land_area';
    else if (target.category.value === 'Crime Index')
      category = 'crime_index';
    else if (target.category.value === 'Number of Towns')
      category = 'num_towns';
    else if (target.category.value === 'Total Population')
      category = 'sum_population';
    else if (target.category.value === 'Average Median Income')
      category = 'avg_income';
    else if (target.category.value === 'Average Adj. Median Income')
      category = 'avg_adj_income';
    else if (target.category.value === 'Average Cost of Living')
      category = 'avg_cost_of_living';
    else if (target.category.value === 'Number of Counties')
      category = 'num_counties';

    if (target.category.value === '--Please Select Category--') {
      this.setState({
        visible: true,
        message: 'Please select a category'
      });
    } else if (this.state.scope === 'state' && target.state.value === '--Please Select State--') {
      this.setState({
        visible: true,
        message: 'Please select a state'
      });
    } else {
      let self = this;
      axios.get(`http://localhost:3001/MyTown/Leaderboards?mode=${this.state.mode}` +
          `&category=${category}&direction=${target.direction.value.toLowerCase()}` +
          `&quantity=${target.quantity.value}&scope=${this.state.scope}&state=${target.state.value}`)
        .then((result) => {
          let results = JSON.parse(result.data);

          let resultsArr = [];
          for (let i in results) {
            if (self.state.mode === 'town') {
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
            } else if (self.state.mode === 'county') {
              resultsArr.push({
                county: results[i].county,
                state: results[i].state,
                num_towns: results[i].num_towns,
                population: results[i].sum_population,
                median_income: results[i].avg_income,
                adjusted_median_income: results[i].avg_adj_income,
                cost_of_living: results[i].avg_cost_of_living
              });
            } else if (self.state.mode === 'state') {
              resultsArr.push({
                state: results[i].state,
                num_towns: results[i].num_towns,
                num_counties: results[i].num_counties,
                population: results[i].sum_population,
                median_income: results[i].avg_income,
                adjusted_median_income: results[i].avg_adj_income,
                cost_of_living: results[i].avg_cost_of_living
              });
            }
          }

          self.setState({results: resultsArr});
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

  toggleMode = (selected) => {
    this.setState({
      mode: selected,
      results: [],
      category: '--Please Select Category--'
    });

    if (selected === 'state')
      this.setState({scope: 'overall'});
  };

  toggleScope = (selected) => {
    this.setState({
      scope: selected,
      results: []
    });
  };

  selectCategory = (ev) => {
    this.setState({category: ev.target.value});
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

    return (
      <Container>
        <Row>
          <Col xs={{size: 4, offset: 2}}>
            <ButtonGroup id="mode">
              <Button onClick={() => this.toggleMode('town')} active={this.state.mode === 'town'}>Towns</Button>
              <Button onClick={() => this.toggleMode('county')} active={this.state.mode === 'county'}>Counties</Button>
              <Button onClick={() => this.toggleMode('state')} active={this.state.mode === 'state'}>States</Button>
            </ButtonGroup>
          </Col>
          <Col xs={{size: 4, offset: 2}}>
            <ButtonGroup>
              <Button onClick={() => this.toggleScope('state')} active={this.state.scope === 'state'} disabled={this.state.mode === 'state'}>State</Button>
              <Button onClick={() => this.toggleScope('overall')} active={this.state.scope === 'overall'}>Overall</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col xs={{size: 8, offset: 2}}>
            <Form onSubmit={this.getLeaderboardData}>
              <Row form>
                <Col xs={{size: 4}}>
                  <FormGroup>
                    <Input value={this.state.category} onChange={this.selectCategory}
                        type='select' id='category' name='category'>
                      <option>--Please Select Category--</option>
                      <option hidden={this.state.mode !== 'town'}>Population</option>
                      <option hidden={this.state.mode !== 'town'}>Median Income</option>
                      <option hidden={this.state.mode !== 'town'}>Adjusted Median Income</option>
                      <option hidden={this.state.mode !== 'town'}>Cost of Living</option>
                      <option hidden={this.state.mode !== 'town'}>Land Area</option>
                      <option hidden={this.state.mode !== 'town'}>Crime Index</option>
                      <option hidden={this.state.mode === 'town'}>Number of Towns</option>
                      <option hidden={this.state.mode !== 'state'}>Number of Counties</option>
                      <option hidden={this.state.mode === 'town'}>Total Population</option>
                      <option hidden={this.state.mode === 'town'}>Average Median Income</option>
                      <option hidden={this.state.mode === 'town'}>Average Adj. Median Income</option>
                      <option hidden={this.state.mode === 'town'}>Average Cost of Living</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={{size: 2}}>
                  <FormGroup>
                    <Input type='select' id='direction' name='direction'>
                      <option>Top</option>
                      <option>Bottom</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={{size: 2}}>
                  <FormGroup>
                    <Input type='select' id='quantity' name='quantity'>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                      <option>100</option>
                      <option>200</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col xs={{size: 2}} hidden={this.state.scope === 'overall'}>
                  <FormGroup>
                    {stateList}
                  </FormGroup>
                </Col>
                <Col xs={{size: 2}}>
                  <Button>Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={{size: 4, offset: 2}}>
            <Alert color='primary' isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>
          </Col>
        </Row>
        <br/>
        <Row hidden={this.state.results.length === 0}>
          {
            (this.state.mode === 'town')
            ?
            <Col>
              <TownTable towns={this.state.results} page={this.state.mode}
                  scope={this.state.scope} type={'leaderboard'} />
            </Col>
            :
              (this.state.mode === 'county')
              ?
              <Col>
                <CountyTable counties={this.state.results} page={this.state.mode}
                    scope={this.state.scope} type={'leaderboard'} />
              </Col>
              :
              <Col>
                <StateTable states={this.state.results} page={this.state.mode}
                    type={'leaderboard'} />
              </Col>
          }
        </Row>
      </Container>
    );
  }
}

export default Leaderboard;
