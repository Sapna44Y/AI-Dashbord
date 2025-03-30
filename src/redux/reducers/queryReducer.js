import {
  SUBMIT_QUERY,
  PROCESS_QUERY,
  QUERY_SUCCESS,
  QUERY_ERROR,
  SET_LOADING,
  SET_SUGGESTIONS,
  ADD_TO_HISTORY,
} from "../actionTypes";

const initialState = {
  currentQuery: "",
  queryResults: null,
  queryHistory: [],
  isLoading: false,
  error: null,
  suggestions: [],
  chartData: null,
};

export const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_QUERY:
      return {
        ...state,
        currentQuery: action.payload,
        isLoading: true,
        error: null,
      };
    case PROCESS_QUERY:
      return {
        ...state,
        isLoading: true,
      };
    case QUERY_SUCCESS:
      const historyItem = {
        query: state.currentQuery,
        timestamp: new Date().toISOString(),
      };

      // Check if this query is already in history to avoid duplicates
      const isDuplicate = state.queryHistory.some(
        (item) => item.query === state.currentQuery
      );

      return {
        ...state,
        queryResults: action.payload.data,
        chartData: action.payload.chartData,
        isLoading: false,
        error: null,
        queryHistory: isDuplicate
          ? state.queryHistory
          : [historyItem, ...state.queryHistory],
      };
    case QUERY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload,
      };
    case ADD_TO_HISTORY:
      const newHistoryItem =
        typeof action.payload === "string"
          ? { query: action.payload, timestamp: new Date().toISOString() }
          : action.payload;

      return {
        ...state,
        queryHistory: [newHistoryItem, ...state.queryHistory],
      };
    default:
      return state;
  }
};
