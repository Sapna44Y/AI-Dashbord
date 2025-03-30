import {
  SUBMIT_QUERY,
  PROCESS_QUERY,
  QUERY_SUCCESS,
  QUERY_ERROR,
  SET_LOADING,
  SET_SUGGESTIONS,
  ADD_TO_HISTORY,
} from "../actionTypes";

export const submitQuery = (query) => ({
  type: SUBMIT_QUERY,
  payload: query,
});

export const processQuery = () => ({
  type: PROCESS_QUERY,
});

export const querySuccess = (results) => ({
  type: QUERY_SUCCESS,
  payload: results,
});

export const queryError = (error) => ({
  type: QUERY_ERROR,
  payload: error,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setSuggestions = (suggestions) => ({
  type: SET_SUGGESTIONS,
  payload: suggestions,
});

export const addToHistory = (query) => ({
  type: ADD_TO_HISTORY,
  payload: query,
});
