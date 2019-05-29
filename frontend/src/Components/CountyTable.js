import React, {Component} from 'react'
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import '../Static/CSS/Table.css';

class CountyTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortAscending: false
    };
  }

  handleClick = (column) => {
    this.props.counties.sort(this.compareValues(column, this.state.sortAscending));
    this.setState({sortAscending: !this.state.sortAscending});
  };

  compareValues = (key, ascending) => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
        return 0;

      let val1 = a[key];
      let val2 = b[key];

      let comparison = 0;

      if (val1 > val2 || val2 === 'N/A')
        comparison = 1;
      else if (val1 < val2 || val1 === 'N/A')
        comparison = -1;

      if (!ascending)
        comparison *= -1;

      return comparison;
    };
  }

  renderItem = (county, index) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let itemRow = [
      <tr key={index}>
        <th scope='row'>{parseInt(index) + 1}</th>
        <td>
          <div style={{maxWidth: '100px'}}>
            <NavLink key={index} to={`/MyTown/County/${county.county}/${county.state}`}
                style={{textDecoration: 'none'}}>
              <p style={{marginBottom: 0}} className='navText'>{county.county}</p>
            </NavLink>
          </div>
        </td>
        <td hidden={this.props.type !== 'leaderboard' || this.props.scope === 'state'}>
          <div style={{maxWidth: '100px'}}>
            <NavLink key={index} to={`/MyTown/State/${county.state}`}
                style={{textDecoration: 'none'}}>
              <p style={{marginBottom: 0}} className='navText'>{county.state}</p>
            </NavLink>
          </div>
        </td>
        <td>{county.num_towns.toLocaleString()}</td>
        <td>{county.population.toLocaleString()}</td>
        <td>{formatter.format(county.median_income)}</td>
        <td>{formatter.format(county.adjusted_median_income)}</td>
        <td>{Math.round(county.cost_of_living * 100) / 100}</td>
      </tr>
    ];

    return itemRow;
  };

  render() {
    let allItemRows = [];

    for (let i in this.props.counties) {
      let itemRow = this.renderItem(this.props.counties[i], i);
      allItemRows = allItemRows.concat(itemRow);
    }

    return (
      <Table hover responsive>
        <thead className='titleRow'>
          <tr>
            <td></td>
            <td>
              County{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('county')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td hidden={this.props.type !== 'leaderboard' || this.props.scope === 'state'}>
              State
            </td>
            <td>
              # of Towns{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('num_towns')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Total Population{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('population')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Avg. Median Income{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('median_income')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Avg. Adj. Median Income{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('adjusted_median_income')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Avg. Cost of Living{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('cost_of_living')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
          </tr>
        </thead>
        <tbody>
          {allItemRows}
        </tbody>
      </Table>
    )
  };
}

export default CountyTable;
