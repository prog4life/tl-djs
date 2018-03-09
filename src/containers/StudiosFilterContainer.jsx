// import React from 'react';
import { connect } from 'react-redux';

import StudiosFilter from 'components/StudiosFilter';
import * as actions from 'actions';
import {
  getFilterSearchText, getFilterTags, getBasePriceRange,
} from 'reducers';

const mapStateToProps = state => ({
  searchText: getFilterSearchText(state),
  tags: getFilterTags(state),
  basePriceRange: getBasePriceRange(state),
  // lowestPrice: getLowestPrice(state),
  // highestPrice: getHighestPrice(state),
});

export default connect(mapStateToProps, actions)(StudiosFilter);
