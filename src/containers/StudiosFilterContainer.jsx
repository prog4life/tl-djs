// import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import StudiosFilter from 'components/StudiosFilter';

const mapStateToProps = state => ({
  searchText: state.filter.searchText,
  tags: state.filter.tags,
});

export default connect(mapStateToProps, actions)(StudiosFilter);
