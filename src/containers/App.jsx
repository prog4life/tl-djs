import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';

import StudiosContainer from 'containers/StudiosContainer';
import NotFound from 'components/NotFound';

setConfig({ logLevel: 'debug' });

const routes = (
  <Router>
    <Switch>
      <Route component={StudiosContainer} exact path="/" />
      <Route component={StudiosContainer} path="/studios" />
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
