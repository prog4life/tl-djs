// import React from 'react';
import { connect } from 'react-redux';

import {
  loadStudios, addStudiosFilterTag, setStudiosFilterText
} from 'actions';
import StudiosFilter from 'components/StudiosFilter';

const mapStateToProps = state => ({
  isLoading: state.studios.isLoading,
  studios: Object.values(state.studios.studiosByIds),
  searchText: state.filter.searchText,
  tags: state.filter.tags
});

export default connect(mapStateToProps, {
  loadStudios,
  addStudiosFilterTag,
  setStudiosFilterText
})(StudiosFilter);
