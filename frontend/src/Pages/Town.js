import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

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
      crime_index: 0
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
          population: town.population,
          median_income: formatter.format(town.median_income),
          adjusted_median_income: formatter.format(town['median_income / (cost_of_living / 100)']),
          cost_of_living: town.cost_of_living,
          land_area: town.land_area,
          crime_index: (town.crime_index || 'N/A')
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
            <p>Name: {this.state.name}</p>
            <p>County: {this.state.county}</p>
            <p>State: {this.state.state}</p>
            <p>Population: {this.state.population}</p>
            <p>Median Income: {this.state.median_income}</p>
            <p>Adjusted Median Income: {this.state.adjusted_median_income}</p>
            <p>Cost of Living: {this.state.cost_of_living}</p>
            <p>Land Area: {this.state.land_area}</p>
            <p>Crime Index: {this.state.crime_index}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Town;
