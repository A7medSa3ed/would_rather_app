import React from "react";
import SelectAnswer from "../components/question/SelectAnswer";
import { connect } from "react-redux";
import AnswerDetails from "../components/question/AnswerDetails";
import { Redirect } from "react-router-dom";

const QuestionPage = ({ match, history, answered, authedUserId }) => {
  // match ,history --> comming from react-router-dom
  // answered, authedUserId --> comming from redux connect

  if (authedUserId === "") return <Redirect to="/" />;
  return answered ? (
    <AnswerDetails questionId={match.params.id} history={history} />
  ) : (
    <SelectAnswer questionId={match.params.id} history={history} />
  );
};

const mapStateToProps = ({ users, authedUserId }, props) => {
  const questionId = props.match.params.id;

  const answered =
    authedUserId && users[authedUserId].answers.hasOwnProperty(questionId);

  return { answered, authedUserId };
};

export default connect(mapStateToProps)(QuestionPage);
