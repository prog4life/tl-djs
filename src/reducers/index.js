import { combineReducers } from 'redux';

import studiosReducer, { getAllStudios } from './studiosReducer';
import filterReducer, { getFilterParams } from './filterReducer';

export default combineReducers({
  studios: studiosReducer,
  filter: filterReducer,
});

export const getFilteredStudios = ({ studios, filter }) => {
  const { searchText, tags, minPrice, maxPrice } = getFilterParams(filter);
  const filteredStudios = getAllStudios(studios).filter((studio) => {
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
