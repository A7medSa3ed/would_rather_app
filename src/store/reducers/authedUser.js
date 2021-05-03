import { SET_AUTHED_USERS } from "../actions/authedUser";

export const authedUserId = (state = "", action) => {
  switch (action.type) {
    case SET_AUTHED_USERS:
      const { authedUserId } = action;
      return authedUserId;

    default:
      return state;
  }
};
