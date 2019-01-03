import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './Main';
import Home from './Pages/Home';
import Town from './Pages/Town';
import County from './Pages/County';
import State from './Pages/State';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/MyTown/Home' render={() => (
          <Main component={Home} />
        )}/>

        <Route path='/MyTown/Town/:town/:county/:state' render={(match) => (
          <Main component={Town} town={match.match.params.town}
              county={match.match.params.county} state={match.match.params.state} />
        )}/>

        <Route path='/MyTown/County/:county/:state' render={(match) => (
          <Main component={County} county={match.match.params.county}
              state={match.match.params.state} />
        )}/>

        <Route path='/MyTown/State/:state' render={(match) => (
          <Main component={State} state={match.match.params.state} />
        )}/>

        <Route render={() => (
          <Redirect to={'/MyTown/Home'} />
        )}/>
      </Switch>
    );
  }
}

export default App;
