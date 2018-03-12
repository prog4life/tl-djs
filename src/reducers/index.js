import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import _intersection from 'lodash.intersection';

import studiosReducer, * as fromStudios from './studiosReducer';
import filterReducer, * as fromFilter from './filterReducer';
// NOTE: const { getFilterParams } = fromFilter;
const {
  getFilteringParams,
  getBaseRange,
  // getBaseMin,
  // getBaseMax,
  getSearchText,
  getAllTags,
} = fromFilter;

export default combineReducers({
  studios: studiosReducer,
  filter: filterReducer,
});

export const getIsLoading = state => fromStudios.getIsLoading(state.studios);

const getFilterParams = state => getFilteringParams(state.filter);
const getAllStudios = state => fromStudios.getAll(state.studios);

export const getFilteredStudios = createSelector(
  [getFilterParams, getAllStudios],
  ({ searchText, tags: rawTags, minPrice, maxPrice }, studios) => {
    const tags = rawTags.map(tag => tag.trim().toLowerCase());

    return studios.filter((studio) => {
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
      console.time('--- count intersection ---');
      // check if one of tags match one of studio params
      const hasSomeTag = studio.params.some(param =>
        tags.some(tag => tag === param));
      console.timeEnd('--- count intersection ---');

      // const hasSomeTag = _intersection(studio.params, tags).length > 0;
      // console.timeEnd('--- count intersection ---');

      if (!searchText && hasTags) {
        return hasSomeTag;
      }
      if (searchText && hasTags) {
        return hasTextMatch || hasSomeTag;
      }
      return false;
    });
  },
);

export const getFilterSearchText = state => getSearchText(state.filter);

export const getFilterTags = state => getAllTags(state.filter);

// export const getBasePriceRange = state => getBaseRange(state.filter);

const getBaseMin = state => getBaseRange(state.filter)[0];
const getBaseMax = state => getBaseRange(state.filter)[1];

export const getBasePriceRange = createSelector(
  [getBaseMin, getBaseMax],
  (minPrice, maxPrice) => [minPrice, maxPrice],
);

// export const getFilteredStudios = ({ studios, filter }) => {
//   const { searchText, tags, minPrice, maxPrice } = getFilteringParams(filter);
//   const filteredStudios = fromStudios.getAll(studios).filter((studio) => {
//     if ((minPrice && studio.price < minPrice) ||
//         (maxPrice && studio.price > maxPrice)) {
//       return false;
//     }
//     const hasTags = tags.length > 0;
//
//     if (!searchText && !hasTags) {
//       return true;
//     }
//     const hasTextMatch = studio.params.includes(searchText);
//
//     if (searchText && !hasTags) {
//       return hasTextMatch;
//     }
//     // check if one of tags match one of studio params
//     const hasSomeTag = studio.params.some(param =>
//       tags.some(tag => tag.trim().toLowerCase() === param));
//
//     if (!searchText && hasTags) {
//       return hasSomeTag;
//     }
//     if (searchText && hasTags) {
//       return hasTextMatch || hasSomeTag;
//     }
//     return false;
//   });
//   return filteredStudios;
// };
