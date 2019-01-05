import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

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
          num_towns: county['COUNT(*)'].toLocaleString(),
          population: county['SUM(population)'].toLocaleString(),
          median_income: formatter.format(county['AVG(median_income)']),
          adjusted_median_income: formatter.format(county['AVG(median_income / (cost_of_living / 100))']),
          cost_of_living: Math.round(county['AVG(cost_of_living)'] * 100) / 100
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
            <p>County: {this.state.county}</p>
            <p>State: {this.state.state}</p>
            <p>Number of Towns: {this.state.num_towns}</p>
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

export default County;
