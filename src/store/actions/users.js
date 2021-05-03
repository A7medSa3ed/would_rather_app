import { saveNewUser } from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const GET_USERS = "GET_USERS";
export const SAVE_NEW_USER = "SAVE_NEW_USER";

export const getUsers = users => ({ type: GET_USERS, users });

const saveUser = user => ({ type: SAVE_NEW_USER, user });

export const addNewUser = userName => dispatch => {
  dispatch(showLoading());
  console.log(userName);
  saveNewUser(userName).then(user => {
    dispatch(saveUser(user));
    dispatch(hideLoading());
  });
};
