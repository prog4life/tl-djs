// import React from 'react';
import { connect } from 'react-redux';

import StudiosFilter from 'components/StudiosFilter';
import * as actions from 'actions';
import { getInitialPriceRange } from 'reducers/filterReducer';

const mapStateToProps = state => ({
  searchText: state.filter.searchText,
  tags: state.filter.tags,
  initialPriceRange: getInitialPriceRange(state),
  // lowestPrice: getLowestPrice(state),
  // highestPrice: getHighestPrice(state),
});

export default connect(mapStateToProps, actions)(StudiosFilter);
