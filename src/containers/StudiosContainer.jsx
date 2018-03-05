// import React from 'react';
import { connect } from 'react-redux';

import {
  loadStudios, addStudiosFilterTag, setStudiosFilterText
} from 'actions';
import Studios from 'components/Studios';
import { getAllStudios } from 'reducers/studiosReducer';

const mapStateToProps = state => ({
  isLoading: state.studios.isLoading,
  studios: getAllStudios(state),
});

export default connect(mapStateToProps, {
  loadStudios,
  addStudiosFilterTag,
  setStudiosFilterText,
})(Studios);
