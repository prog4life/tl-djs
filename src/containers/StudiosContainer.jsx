// import React from 'react';
import { connect } from 'react-redux';

import { loadStudios } from 'actions';
import Studios from 'components/Studios';

const mapStateToProps = state => ({
  isLoading: state.studios.isLoading,
  studios: Object.values(state.studios.studiosByIds)
});

export default connect(mapStateToProps, { loadStudios })(Studios);
