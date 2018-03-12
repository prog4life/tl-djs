import {
  ADD_FILTER_TAG,
  REMOVE_FILTER_TAG,
  SET_FILTER_TEXT,
  SET_FILTER_RANGE,
} from 'constants/actionTypes';

// TEMP:
const LOAD_STUDIOS = 'LOAD_STUDIOS';

const defaultState = {
  searchText: '',
  tags: ['Картина'],
  baseRange: [0, 10000],
  selectedRange: [],
};

// MISTAKE: sort mutates external data                                             !!!

// const priceRanges = (state = {}, action) => {
//   if (action.type === `${LOAD_STUDIOS}_FULFILLED`) {
//     // const prevMinPrice = state.filterMin;
//     // const prevMaxPrice = state.filterMax;
//     const sorted = [...action.payload].sort((s1, s2) => s1.price - s2.price);
//     const lowest = sorted[0].price;
//     const highest = sorted.slice(-1)[0].price;

//     return {
//       // filterMin: prevMinPrice && prevMinPrice > lowest
//       //   ? prevMinPrice
//       //   : lowest,
//       // filterMax: prevMaxPrice && prevMaxPrice < highest
//       //   ? prevMaxPrice
//       //   : highest,
//       filterMin: lowest,
//       filterMax: highest,
//       lowest,
//       highest,
//     };
//   } else if (action.type === SET_FILTER_RANGE) {
//     return {
//       ...state,
//       filterMin: action.minPrice,
//       filterMax: action.maxPrice,
//     };
//   }
//   return state;
// };

export const baseRange = (state, action) => {
  if (action.type === `${LOAD_STUDIOS}_FULFILLED`) {
    const [first] = action.payload;
    const [last] = action.payload.slice(-1);
    const lowest = first && first.price;
    const highest = last && last.price;
    // TODO: test with 1000 and 1000

    // TODO: return prev state if values are the same ?

    if (lowest && highest && lowest !== highest) {
      return [lowest, highest];
    } else if (lowest === highest) {
      return [0, highest];
    }
  }
  return state;
};

const filterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_FILTER_TAG: // TODO: prevent additon of duplicate tag
      return {
        ...state,
        tags: [...state.tags, action.tagName]
      };
    case REMOVE_FILTER_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tagName)
      };
    case SET_FILTER_TEXT:
      return {
        ...state,
        searchText: action.searchText.trim().toLowerCase(),
      };
    case SET_FILTER_RANGE:
      return {
        ...state,
        selectedRange: [action.min, action.max],
      };
    case `${LOAD_STUDIOS}_FULFILLED`: {
      return {
        ...state,
        baseRange: baseRange(state.baseRange, action),
      };
    }
    default:
      return state;
  }
};

export default filterReducer;

export const getLowestPrice = state => state.filter.minPrice;
export const getHighestPrice = state => state.filter.maxPrice;

export const getSearchText = state => state.searchText;

export const getAllTags = state => state.tags;

export const getBaseRange = state => state.baseRange;

// export const getBaseMin = state => state.baseRange[0];
// export const getBaseMax = state => state.baseRange[1];

export function getFilteringParams(state) {
  const { searchText, tags, selectedRange } = state;

  return {
    searchText,
    tags,
    minPrice: selectedRange[0] || state.baseRange[0],
    maxPrice: selectedRange[1] || state.baseRange[1],
  };
}
