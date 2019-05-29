import React, {Component} from 'react'
import { Table, UncontrolledTooltip } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import '../Static/CSS/Table.css';

class TownTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortAscending: false
    };
  }

  handleClick = (column) => {
    this.props.towns.sort(this.compareValues(column, this.state.sortAscending));
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

  renderItem = (town, index) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let itemRow = [
      <tr key={index}>
        <th scope='row'>{parseInt(index) + 1}</th>
        <td>
          <div style={{maxWidth: '100px'}}>
          <NavLink key={index} to={`/MyTown/Town/${town.town}/${town.county}/${town.state}`}
              style={{textDecoration: 'none'}}>
            <p style={{marginBottom: 0}} className='navText'>{town.town}</p>
          </NavLink>
          </div>
        </td>
        <td hidden={this.props.page === 'county'}>
          <div style={{maxWidth: '100px'}}>
            <NavLink key={index} to={`/MyTown/County/${town.county}/${town.state}`}
                style={{textDecoration: 'none'}}>
              <p style={{marginBottom: 0}} className='navText'>{town.county}</p>
            </NavLink>
          </div>
        </td>
        <td hidden={this.props.type !== 'leaderboard' || this.props.scope === 'state'}>
          <div style={{maxWidth: '100px'}}>
            <NavLink key={index} to={`/MyTown/State/${town.state}`}
                style={{textDecoration: 'none'}}>
              <p style={{marginBottom: 0}} className='navText'>{town.state}</p>
            </NavLink>
          </div>
        </td>
        <td>{town.population.toLocaleString()}</td>
        <td>{formatter.format(town.median_income)}</td>
        <td>{formatter.format(town.adjusted_median_income)}</td>
        <td>{town.cost_of_living}</td>
        <td>{town.land_area}</td>
        <td>{town.crime_index}</td>
      </tr>
    ];

    return itemRow;
  };

  render() {
    let allItemRows = [];

    for (let i in this.props.towns) {
      let itemRow = this.renderItem(this.props.towns[i], i);
      allItemRows = allItemRows.concat(itemRow);
    }

    return (
      <Table hover responsive>
        <thead className='titleRow'>
          <tr>
            <td></td>
            <td>
              Town{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('town')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td hidden={this.props.page === 'county'}>
              County{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('county')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td hidden={this.props.type !== 'leaderboard' || this.props.scope === 'state'}>
              State
            </td>
            <td>
              Population{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('population')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Median Income{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('median_income')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Adj. Median Income{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('adjusted_median_income')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              <span id='col'>COL{' '}</span>
              <UncontrolledTooltip placement='top' target='col'>Cost of Living</UncontrolledTooltip>
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('cost_of_living')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Land Area{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('land_area')} className='fa fa-sort sortIcon'></i>
              </span>
            </td>
            <td>
              Crime{' '}
              <span hidden={this.props.type === 'leaderboard'}>
                <i onClick={() => this.handleClick('crime_index')} className='fa fa-sort sortIcon'></i>
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

export default TownTable;
