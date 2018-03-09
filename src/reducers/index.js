import { combineReducers } from 'redux';

import studiosReducer, * as fromStudios from './studiosReducer';
import filterReducer, * as fromFilter from './filterReducer';
// NOTE: const { getFilterParams } = fromFilter;
const {
  getFilteringParams, getBaseRange, getSearchText, getAllTags,
} = fromFilter;

export default combineReducers({
  studios: studiosReducer,
  filter: filterReducer,
});

export const getFilteredStudios = ({ studios, filter }) => {
  const { searchText, tags, minPrice, maxPrice } = getFilteringParams(filter);
  const filteredStudios = fromStudios.getAll(studios).filter((studio) => {
    if ((minPrice && studio.price < minPrice) ||
        (maxPrice && studio.price > maxPrice)) {
      return false;
    }
    const hasTags = tags.length > 0;

    if (!searchText && !hasTags) {
      return true;
    }
    const hasTextMatch = studio.params.includes(searchText);

    if (searchText && !hasTags) {
      return hasTextMatch;
    }
    // check if one of tags match one of studio params
    const hasTagMatch = studio.params.some(param =>
      tags.some(tag => tag.trim().toLowerCase() === param));

    if (!searchText && hasTags) {
      return hasTagMatch;
    }
    if (searchText && hasTags) {
      return hasTextMatch || hasTagMatch;
    }
    return false;
  });
  return filteredStudios;
};

export const getFilterSearchText = state => getSearchText(state.filter);

export const getFilterTags = state => getAllTags(state.filter);

export const getBasePriceRange = state => getBaseRange(state.filter);

export const getIsLoading = state => fromStudios.getIsLoading(state.studios);
