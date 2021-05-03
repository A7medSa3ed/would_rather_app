import React from "react";
import { connect } from "react-redux";
import Home from "../home";
import { Redirect } from "react-router-dom";

const UserProfile = ({
  userId,
  userQuestions,
  userAnswers,
  authedUserId,
  tabState,
}) => {
  //userId, userQuestions, userAnswers, authedUserId --> comming from redux connect
  // match, tabState --> comming from user Profile Page

  if (!userId || authedUserId === "") return <Redirect to="/" />;

  return (
    <Home
      userQuestions={userQuestions}
      usersAnswers={userAnswers}
      userId={userId}
      currentTab={tabState && tabState.tab}
    />
  );
};

const mapStateToProps = ({ users, questions, authedUserId }, { match }) => {
  const user = users[match.params.id];
  const userAnswers = Object.values(questions)
    .filter(question => user.answers.hasOwnProperty(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const userQuestions = Object.values(questions)
    .filter(question => user.questions.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userId: user?.id,
    userQuestions,
    userAnswers,
    authedUserId,
  };
};
export default connect(mapStateToProps)(UserProfile);
