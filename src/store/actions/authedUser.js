export const SET_AUTHED_USERS = "SET_AUTHED_USERS";

export const setAuthedUser = (authedUserId = "") => ({
  type: SET_AUTHED_USERS,
  authedUserId,
});
