import { combineReducers } from 'redux';

import studiosReducer, * as fromStudios from './studiosReducer';
import filterReducer, * as fromFilter from './filterReducer';
// NOTE: const { getFilterParams } = fromFilter;
const { getFilteringParams, getBaseRange } = fromFilter;

export default combineReducers({
  studios: studiosReducer,
  filter: filterReducer,
});

export const getFilteredStudios = ({ studios, filter }) => {
  const { searchText, tags, minPrice, maxPrice } = getFilteringParams(filter);
  const filteredStudios = fromStudios.getAll(studios).filter((studio) => {
    const isSuitable = (
      studio.price >= minPrice &&
      studio.price <= maxPrice &&
      (studio.params.includes(searchText) ||
      // check if one of tags match one of studio params
      studio.params.some(param =>
        tags.some(tag => tag.trim().toLowerCase() === param)))
    );
    return !isSuitable;
  });
  return filteredStudios;
};

export const getIsLoading = state => fromStudios.getIsLoading(state.studios);

export const getBasePriceRange = state => getBaseRange(state.filter);

