import {
  LOAD_STUDIOS_REQUEST,
  LOAD_STUDIOS_SUCCESS,
  LOAD_STUDIOS_FAIL,
} from 'constants/actionTypes';

// TEMP
const LOAD_STUDIOS = 'LOAD_STUDIOS';

const defaultState = {
  isLoading: false,
  studiosByIds: {}
};

// NOTE: Dans's initial solution, before using normalize
const transformArrayToObj = (state, action) => {
  const nextState = { ...state };
  action.response.forEach((studio) => {
    nextState[studio.id] = studio;
  });
  return nextState;
};

// TODO: and replace close to filter reducer 
const isLoading = (state = false, action) => {
  if (action.filter !== filter) { // video 21: displaying loading indicators
    return state;
  }
  switch (action.type) {
    case LOAD_STUDIOS_REQUEST:
      return true;
    case LOAD_STUDIOS_SUCCESS:
    case LOAD_STUDIOS_FAIL:
      return false;
    default:
      return state;
  }
};

const studios = (state = defaultState, action) => {
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
      };
    case `${LOAD_STUDIOS}_FULFILLED`:
      return {
        isLoading: false,
        studiosByIds: {
          // ...state.studiosByIds,
          ...action.payload,
        },
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

export default studios;
