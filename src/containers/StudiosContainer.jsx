// import React from 'react';
import { connect } from 'react-redux';

import Studios from 'components/Studios';
import {
  loadStudios, addFilterTag, setFilterText,
} from 'actions';
import { getIsLoading, getFilteredStudios } from 'reducers';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  studios: getFilteredStudios(state),
});

export default connect(mapStateToProps, {
  loadStudios,
  addFilterTag,
  setFilterText,
})(Studios);
