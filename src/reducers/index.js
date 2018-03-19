import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import _intersection from 'lodash.intersection';
import _union from 'lodash.union';

import studiosReducer, * as fromStudios from './studiosReducer';
import filterReducer, * as fromFilter from './filterReducer';
// NOTE: const { getFilterParams } = fromFilter;
const {
  getFilteringParams,
  getBaseRange,
  getSelectedRange,
  getSearchText,
  getAllTags,
} = fromFilter;

export default combineReducers({
  studios: studiosReducer,
  filter: filterReducer,
});

export const getIsLoading = state => fromStudios.getIsLoading(state.studios);

// const getFilterParams = state => getFilteringParams(state.filter);

const getListOfAllStudios = state => fromStudios.getAll(state.studios);
const getAllStudiosByIds = state => fromStudios.getAllByIds(state.studios);

export const getSortedByPrice = ({ studios }) =>
  fromStudios.getSortedByPrice(studios);

const getBaseMin = state => getBaseRange(state.filter)[0];
const getBaseMax = state => getBaseRange(state.filter)[1];

export const getBasePriceRange = createSelector(
  [getBaseMin, getBaseMax],
  (minPrice, maxPrice) => [minPrice, maxPrice],
);

export const getFilterSearchText = state => getSearchText(state.filter);

export const getFilterTags = state => getAllTags(state.filter);

const getSelectedMinPrice = state =>
  getSelectedRange(state.filter)[0] || getBaseRange(state.filter)[0];

const getSelectedMaxPrice = state =>
  getSelectedRange(state.filter)[1] || getBaseRange(state.filter)[1];

const getFilteredByPrice = createSelector(
  getSelectedMinPrice,
  getSelectedMaxPrice,
  getSortedByPrice,
  getAllStudiosByIds,
  (minPrice, maxPrice, studioIds, studiosByIds) =>
    studioIds.filter((id) => {
      const { price } = studiosByIds[id];
      // consider omitting of items that have no price
      return price >= minPrice && price <= maxPrice;
    }),
);

// only items with exact match between one of params and serachText will be left
const getFilteredBySearchText = createSelector(
  getFilterSearchText,
  getSortedByPrice,
  getAllStudiosByIds,
  (searchText, studioIds, studiosByIds) => {
    if (!searchText) {
      return null;
    }
    return studioIds.filter((id) => {
      const { params } = studiosByIds[id];

      return params.includes(searchText);
    });
  },
);

const getFilteredByTags = createSelector(
  getFilterTags,
  getSortedByPrice,
  getAllStudiosByIds,
  (rawTags, studioIds, studiosByIds) => {
    if (rawTags.length < 1) {
      return null;
    }
    const tags = rawTags.map(tag => tag.trim().toLowerCase());

    return studioIds.filter((id) => {
      const { params } = studiosByIds[id];
      console.time('--- count intersection ---');
      // check if one of tags match one of studio params
      // return params.some(param => tags.some(tag => tag === param));
      // const hasSomeTag = params.some(param => tags.some(tag => tag === param));
      // console.timeEnd('--- count intersection ---');

      // return _intersection(studio.params, tags).length > 0;
      const hasSomeTag = _intersection(params, tags).length > 0;
      console.timeEnd('--- count intersection ---');
      return hasSomeTag;
    });
  },
);

export const getFilteredStudios = createSelector(
  getFilteredByPrice,
  getFilteredBySearchText,
  getFilteredByTags,
  getAllStudiosByIds,
  (filteredByPrice, filteredBySearchText, filteredByTags, studiosByIds) => {
    let resultIds = filteredByPrice;

    if (filteredBySearchText && filteredByTags) {
      console.log('filteredBySearchText: ', filteredBySearchText);
      console.log('filteredByTags: ', filteredByTags);
      const mergedUniqueIds = filteredByTags.reduce((acc, current) => (
        acc.includes(current) ? acc : acc.concat(current)
      ), filteredBySearchText);
      console.log('mergedUniqueIds: ', mergedUniqueIds);
      // const mergedUniqueIds = _union(filteredBySearchText, filteredByTags);
      resultIds = _intersection(filteredByPrice, mergedUniqueIds);
    } else if (filteredBySearchText) {
      resultIds = _intersection(filteredByPrice, filteredBySearchText);
    } else if (filteredByTags) {
      resultIds = _intersection(filteredByPrice, filteredByTags);
    }
    return resultIds.map(id => studiosByIds[id]);
  },
);

// export const getFilteredStudios = createSelector(
//   [getFilterParams, getListOfAllStudios],
//   ({ searchText, tags: rawTags, minPrice, maxPrice }, studios) => {
//     const tags = rawTags.map(tag => tag.trim().toLowerCase());
//
//     return studios.filter((studio) => {
//       if (studio.price < minPrice || studio.price > maxPrice) {
//         return false;
//       }
//       const hasTags = tags.length > 0;
//
//       if (!searchText && !hasTags) {
//         return true;
//       }
//       const hasTextMatch = studio.params.includes(searchText);
//
//       if (searchText && !hasTags) {
//         return hasTextMatch;
//       }
//       console.time('--- count intersection ---');
//       // check if one of tags match one of studio params
//       const hasSomeTag = studio.params.some(param =>
//         tags.some(tag => tag === param));
//       console.timeEnd('--- count intersection ---');
//
//       // const hasSomeTag = _intersection(studio.params, tags).length > 0;
//       // console.timeEnd('--- count intersection ---');
//
//       if (!searchText && hasTags) {
//         return hasSomeTag;
//       }
//       if (searchText && hasTags) {
//         return hasTextMatch || hasSomeTag;
//       }
//       return false;
//     });
//   },
// );
