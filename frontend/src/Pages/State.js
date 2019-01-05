import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

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
    };
  }

  componentDidMount() {
    this.getStateData();
  }

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
          num_towns: state['COUNT(*)'].toLocaleString(),
          num_counties: state['COUNT(DISTINCT county)'].toLocaleString(),
          population: state['SUM(population)'].toLocaleString(),
          median_income: formatter.format(state['AVG(median_income)']),
          adjusted_median_income: formatter.format(state['AVG(median_income / (cost_of_living / 100))']),
          cost_of_living: Math.round(state['AVG(cost_of_living)'] * 100) / 100
        });
      }).catch((error) => {
        if (error.response && error.response.data) {

        } else {

        }
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p>State: {this.state.state}</p>
            <p>Number of Towns: {this.state.num_towns}</p>
            <p>Number of Counties: {this.state.num_counties}</p>
            <p>Total Population: {this.state.population}</p>
            <p>Average Median Income: {this.state.median_income}</p>
            <p>Average Adjusted Median Income: {this.state.adjusted_median_income}</p>
            <p>Average Cost of Living: {this.state.cost_of_living}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default State;
