// Action Creator
import { getUsers } from "./users";
import { getQuestions } from "./questions";

// API Functions
import { getInitialData } from "../../utils/api";

// Loading Bar
import { showLoading, hideLoading } from "react-redux-loading";

export const getIntialData = () => dispatch => {
  dispatch(showLoading());
  getInitialData().then(({ users, questions }) => {
    dispatch(getUsers(users));
    dispatch(getQuestions(questions));
    dispatch(hideLoading());
  });
};
