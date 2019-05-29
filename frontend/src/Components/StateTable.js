import React, {Component} from 'react'
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import '../Static/CSS/Table.css';

class StateTable extends Component {
  renderItem = (state, index) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let itemRow = [
      <tr key={index}>
        <th scope='row'>{parseInt(index) + 1}</th>
        <td>
          <div style={{maxWidth: '100px'}}>
            <NavLink key={index} to={`/MyTown/State/${state.state}`}
                style={{textDecoration: 'none'}}>
              <p style={{marginBottom: 0}} className='navText'>{state.state}</p>
            </NavLink>
          </div>
        </td>
        <td>{state.num_towns.toLocaleString()}</td>
        <td>{state.num_counties.toLocaleString()}</td>
        <td>{state.population.toLocaleString()}</td>
        <td>{formatter.format(state.median_income)}</td>
        <td>{formatter.format(state.adjusted_median_income)}</td>
        <td>{Math.round(state.cost_of_living * 100) / 100}</td>
      </tr>
    ];

    return itemRow;
  };

  render() {
    let allItemRows = [];

    for (let i in this.props.states) {
      let itemRow = this.renderItem(this.props.states[i], i);
      allItemRows = allItemRows.concat(itemRow);
    }

    return (
      <Table hover responsive>
        <thead className='titleRow'>
          <tr>
            <td></td>
            <td>State</td>
            <td># of Towns</td>
            <td># of Counties</td>
            <td>Total Population</td>
            <td>Avg. Median Income</td>
            <td>Avg. Adj. Median Income</td>
            <td>Avg. Cost of Living</td>
          </tr>
        </thead>
        <tbody>
          {allItemRows}
        </tbody>
      </Table>
    )
  };
}

export default StateTable;
