import {
  LOAD_STUDIOS_REQUEST,
  LOAD_STUDIOS_SUCCESS,
  LOAD_STUDIOS_FAIL,
  ADD_STUDIOS_FILTER_TAG,
  REMOVE_STUDIOS_FILTER_TAG,
  SET_STUDIOS_FILTER_TEXT,
} from 'constants/actionTypes';
import transformArrayToObj from 'utils/handleResponse';

// TEMP
const LOAD_STUDIOS = 'LOAD_STUDIOS';

export const loadStudiosRequest = () => ({
  type: LOAD_STUDIOS_REQUEST,
});

export const loadStudiosSuccess = studios => ({
  type: LOAD_STUDIOS_SUCCESS,
  studios,
});

export const loadStudiosFail = error => ({
  type: LOAD_STUDIOS_FAIL,
  message: error.message || 'Failed to load studios',
});

export const addStudiosFilterTag = tagName => ({
  type: ADD_STUDIOS_FILTER_TAG,
  tagName,
});

export const removeStudiosFilterTag = tagName => ({
  type: REMOVE_STUDIOS_FILTER_TAG,
  tagName,
});

export const setStudiosFilterText = searchText => ({
  type: SET_STUDIOS_FILTER_TEXT,
  searchText,
});

// for promise middleware
// export const loadStudiosPromise = promise => ({
//   type: LOAD_STUDIOS,
//   payload: promise,
// });

export const loadStudios = () => (dispatch, getState) => {
  // if (getIsLoading(getState())) { // had 2nd arg "filter" passed in Dans example
  if (getState().studios.isLoading) { // had 2nd arg "filter" passed in Dans example
    return; // Optionally return Promise.resolve()
  }
  const url = 'http://localhost:8585/studios';
  const promise = fetch(url, { mode: 'cors' })
    .then(res => (res.ok ? res.json() : Promise.reject(res.statusText)));
  dispatch({ type: LOAD_STUDIOS, payload: promise });
  // return promise;
};

// TODO: display error message for the user

// rename to fetchStudios if used with promise middleware
// export const loadStudios = () => (dispatch) => {
//   const url = 'http://localhost:8585/studios';

//   dispatch(loadStudiosRequest());
//   return fetch(url, { mode: 'cors' })
//   // return fetch('/studios.json')
//     .then(res =>
//       res.json()
//     )
//     .then(response =>
//       transformArrayToObj(response)
//     )
//     .then(studios =>
//       dispatch(loadStudiosSuccess(studios))
//     )
// TODO: replace catch by 2nd arg rejection handler
//     .catch(error =>
//       // dispatch(loadStudiosFail(error))
//       console.error(error)
//     );
// };
