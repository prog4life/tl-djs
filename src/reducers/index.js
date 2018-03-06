import { combineReducers } from 'redux';

import studios, { getAllStudios } from './studiosReducer';
import filter, { getFilterParams } from './filterReducer';

export default combineReducers({
  studios,
  filter,
});

export const getFilteredStudios = (state) => {
  const { searchText, tags, minPrice, maxPrice } = getFilterParams(state.filter);
  const filteredStudios = getAllStudios(state.studios).filter((studio) => {
    const isSuitable = (
      studio.price >= minPrice &&
      studio.price <= maxPrice &&
      (studio.params.includes(searchText) ||
      studio.params.some(param =>
        tags.some(tag => tag.trim().toLowerCase() === param)))
    );
    return !isSuitable;
  });
  return filteredStudios;
};
