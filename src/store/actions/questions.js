import { saveQuestionAnswer } from "../../utils/api";
import { saveQuestion } from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

//Action Types
export const GET_QUESTIONS = "GET_QUESTIONS";
export const SET_ANSWER = "SET_ANSWER";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

//Action Creator
export const getQuestions = questions => ({ type: GET_QUESTIONS, questions });

const setAnswer = (ans = {}) => ({ type: SET_ANSWER, ans });

const addQuestion = question => ({ type: ADD_NEW_QUESTION, question });

// API Functions
export const saveAnswer = (authedUser, qid, answer) => dispatch => {
  dispatch(setAnswer({ authedUser, qid, answer }));
  return saveQuestionAnswer({ authedUser, qid, answer }).catch(e => {
    console.warn("Erro In Saving Answer", e);
    dispatch(setAnswer({}));
    alert("there was an error answering the question. try again.");
  });
};

export const saveNewQuestion = ({
  optionOneText,
  optionTwoText,
  author,
}) => dispatch => {
  const question = { optionOneText, optionTwoText, author };
  dispatch(showLoading());
  saveQuestion(question).then(question => {
    dispatch(addQuestion(question));
    dispatch(hideLoading());
  });
};
