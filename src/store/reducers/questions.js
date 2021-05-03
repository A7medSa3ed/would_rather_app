import {
  GET_QUESTIONS,
  SET_ANSWER,
  ADD_NEW_QUESTION,
} from "../actions/questions";

export const questions = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state.action,
        ...action.questions,
      };

    case SET_ANSWER:
      let questions = {};
      if (Object.keys(action.ans).length !== 0) {
        const { authedUserId, qid, answer } = action.ans;
        questions = {
          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: state[qid][answer].votes.concat([authedUserId]),
            },
          },
        };
      }
      return { ...state, ...questions };

    case ADD_NEW_QUESTION:
      const { question } = action;
      const newQuestion = {
        [question.id]: {
          ...question,
        },
      };
      return { ...state, ...newQuestion };

    default:
      return state;
  }
};
