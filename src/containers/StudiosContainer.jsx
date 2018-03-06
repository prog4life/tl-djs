// import React from 'react';
import { connect } from 'react-redux';

import Studios from 'components/Studios';
import {
  loadStudios, addStudiosFilterTag, setStudiosFilterText,
} from 'actions';
import { getFilteredStudios } from 'reducers';
import { getIsLoading } from 'reducers/studiosReducer';

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  studios: getFilteredStudios(state),
});

export default connect(mapStateToProps, {
  loadStudios,
  addStudiosFilterTag,
  setStudiosFilterText,
})(Studios);
