import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import auth from "./auth";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
  });
