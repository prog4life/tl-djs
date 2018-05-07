import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';

import StudiosPage from 'components/StudiosPage';
import NotFound from 'components/NotFound';

setConfig({ logLevel: 'error' }); // ['debug', 'log', 'warn', 'error']

const routes = (
  <Router>
    <Switch>
      <Route component={StudiosPage} exact path="/" />
      <Route component={StudiosPage} path="/studios" />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

const App = ({ store }) => (
  <Provider store={store}>
    {routes}
  </Provider>
);

App.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};

// export default hot(module)(App);
export default process.env.NODE_ENV === 'production' ? App : hot(module)(App);
