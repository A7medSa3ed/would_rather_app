import React from "react";
import NewQuestion from "../components/question/NewQuestion";
const AddQuestionPage = ({ history }) => {
  // history --> comming from react router dom

  return <NewQuestion history={history} />;
};

export default AddQuestionPage;
