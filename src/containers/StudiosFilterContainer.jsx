// import React from 'react';
import { connect } from 'react-redux';

import StudiosFilter from 'components/StudiosFilter';
import * as actions from 'actions';
import { getBasePriceRange } from 'reducers';

const mapStateToProps = state => ({
  searchText: state.filter.searchText,
  tags: state.filter.tags,
  basePriceRange: getBasePriceRange(state),
  // lowestPrice: getLowestPrice(state),
  // highestPrice: getHighestPrice(state),
});

export default connect(mapStateToProps, actions)(StudiosFilter);
