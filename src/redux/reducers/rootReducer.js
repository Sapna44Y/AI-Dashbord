import { combineReducers } from "redux";
import { queryReducer } from "./queryReducer";

export const rootReducer = combineReducers({
  query: queryReducer,
});
