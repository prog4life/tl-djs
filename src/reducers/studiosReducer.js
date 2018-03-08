import {
  LOAD_STUDIOS_REQUEST,
  LOAD_STUDIOS_SUCCESS,
  LOAD_STUDIOS_FAIL,
} from 'constants/actionTypes';

// TEMP:
const LOAD_STUDIOS = 'LOAD_STUDIOS';

const defaultState = {
  isLoading: false,
  studiosByIds: {},
  sortedByPrice: [],
};

// NOTE: Dan's initial solution, until normalize was added
// const transformArrayToObj = (state = {}, action) => {
//   const nextState = { ...state };
//   action.payload.forEach((studio) => {
//     nextState[studio.id] = studio;
//   });
//   return nextState;
// };

const transformArrayToObj = (studios) => {
  const next = {};
  studios.forEach((studio) => {
    next[studio.id] = studio;
  });
  return next;
};

export const sortedByPrice = (state = [], action) => {
  switch (action.type) {
    case `${LOAD_STUDIOS}_FULFILLED`:
      return action.payload.map(studio => studio.id);
    default:
      return state;
  }
};

// // TODO: and replace close to filter reducer
// const isLoading = (state = false, action) => {
//   if (action.filter !== filter) { // video 21: displaying loading indicators
//     return state;
//   }
//   switch (action.type) {
//     case LOAD_STUDIOS_REQUEST:
//       return true;
//     case LOAD_STUDIOS_SUCCESS:
//     case LOAD_STUDIOS_FAIL:
//       return false;
//     default:
//       return state;
//   }
// };

// export const sortedByPriceIds = (state, action)

const studiosReducer = (state = defaultState, action) => {
  switch (action.type) {
    // case LOAD_STUDIOS_REQUEST:
    //   return {
    //     isLoading: true,
    //     studiosByIds: {}
    //   };
    // case LOAD_STUDIOS_SUCCESS:
    //   return {
    //     isLoading: false,
    //     studiosByIds: {
    //       // ...state.studiosByIds,
    //       ...action.studios
    //     }
    //   };
    // case LOAD_STUDIOS_FAIL:
    //   return {
    //     ...state,
    //     isLoading: false
    //   };
    case `${LOAD_STUDIOS}_PENDING`:
      return {
        isLoading: true,
        studiosByIds: {},
        errorMessage: null,
        sortedByPrice: [],
      };
    case `${LOAD_STUDIOS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        // consider not replacing but adding to existing studios
        studiosByIds: transformArrayToObj(action.payload),
        sortedByPrice: sortedByPrice(state.sortedByPrice, action),
      };
    case `${LOAD_STUDIOS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default studiosReducer;

export const getAll = state => Object.values(state.studiosByIds);

// TODO: get ids of sorted
export const getIds = state => Object.keys(state.studiosByIds);

export const getIsLoading = state => state.isLoading;

// export const getFilteredStudios = (state) => {
//   const { searchText, tags, minPrice, maxPrice } = state.filter;
//   const filteredStudios = getAllStudios(state).filter((studio) => {
//     const isSuitable = (
//       studio.price >= minPrice &&
//       studio.price <= maxPrice &&
//       (studio.params.includes(searchText) ||
//       studio.params.some(param =>
//         tags.some(tag => tag.trim().toLowerCase() === param)))
//     );
//     return !isSuitable;
//   });
//   return filteredStudios;
// };

// export const countBasePriceRange = studios => (
//   studios.reduce(([min, max], studio) => [
//     min ? Math.min(min, studio.price) : studio.price,
//     max ? Math.max(max, studio.price) : studio.price,
//   ], [])
// );

// export const getBaseRange = (state) => {
//   const allStudios = getAllStudios(state);
//   const range = countBasePriceRange(allStudios);
//   return range.length ? range : undefined;
// };
// NOTE: or sort and choose 1st and last
