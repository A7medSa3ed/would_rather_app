import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import { users } from "./users";
import { questions } from "./questions";
import { authedUserId } from "./authedUser";

export default combineReducers({
  authedUserId,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
