import { GET_USERS, SAVE_NEW_USER } from "../actions/users";
import { SET_ANSWER, ADD_NEW_QUESTION } from "../actions/questions";

export const users = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };

    case SAVE_NEW_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      };

    case SET_ANSWER:
      let newUsers = {};
      if (Object.keys(action.ans).length !== 0) {
        const { authedUser, qid, answer } = action.ans;
        newUsers = {
          [authedUser]: {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]: answer,
            },
          },
        };
      }
      return { ...state, ...newUsers };

    case ADD_NEW_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id]),
        },
      };

    default:
      return state;
  }
};
