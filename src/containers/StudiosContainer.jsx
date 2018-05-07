import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Studios from 'components/Studios';
import * as actions from 'actions';
import { getIsLoading, getFilteredStudios } from 'reducers';

class StudiosContainer extends Component {
  static propTypes = {
    loadStudios: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { loadStudios } = this.props;
    loadStudios();
  }
  render() {
    const { loadStudios, ...props } = this.props;
    // return <Studios {...props} />; // TEMP replaced by next variant
    return <Studios loadStudios={loadStudios} {...props} />;
  }
}

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  studios: getFilteredStudios(state),
});

export default connect(mapStateToProps, {
  loadStudios: actions.loadStudios,
})(StudiosContainer);
