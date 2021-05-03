import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { formatDate } from "../../utils/helpers";
import { saveAnswer } from "../../store/actions/questions";

const SelectAnswer = ({
  questionId,
  history,
  question,
  author,
  authedUserId,
  dispatch,
}) => {
  // history,questionId --> comming from Question Page
  // question, author, authedUserId, dispatch --> comming from Question connect redux

  const [answer, setAnswer] = useState("");

  /* because state of redux destroyed when hot reloading,
     so if the user reload this page it will redirect him to loggin page */

  const handleChange = e => {
    setAnswer(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(saveAnswer(authedUserId, questionId, answer));
    history.push({ pathname: `/questions/${questionId}`, state: { tab: 0 } });
  };

  return (
    <div className="select_answer card col-lg-6 col-sm-10">
      <Container>
        <Row className="mt-2 mb-4">
          <h3>
            <p style={{ fontSize: "30px" }}>Would you rather</p>
            <span style={{ display: "block", fontSize: "24px" }}>
              {question?.optionOne.text}
            </span>
            <span
              style={{ display: "block", padding: "10px", fontSize: "20px" }}
            >
              Or
            </span>
            <span style={{ display: "block", fontSize: "24px" }}>
              {question?.optionTwo.text}
            </span>
          </h3>
        </Row>
        <Row className="align-items-center">
          <Col className="col-md-1 col-sm-2 pr-0">
            <img
              src={author?.avatarURL}
              alt={`${author.name} img`}
              style={{
                width: "90%",
                height: "90%",
                borderRadius: "50%",
                textAlign: "left",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col
            className="col-lg-6 col-sm-10"
            style={{ color: "#a932006e", fontFamily: "cursive" }}
          >
            <span>{author?.name}</span>
            <span>{formatDate(question?.timestamp)}</span>
          </Col>
        </Row>
        <form id="questionForm" onSubmit={handleSubmit} onChange={handleChange}>
          <Row className="mb-0 ">
            <div
              className="select_options "
              role="radiogroup"
              aria-labelledby="bulgy-radios-label"
            >
              <label>
                <input type="radio" name="question" value="optionOne" />
                <span className="radio"></span>
                <span className="label">{question?.optionOne.text}</span>
              </label>
              <label>
                <input type="radio" name="question" value="optionTwo" />
                <span className="radio"></span>
                <span className="label">{question?.optionTwo.text}</span>
              </label>
            </div>
          </Row>
          <Row>
            <div className="panel green">
              <button
                type="submit"
                form="questionForm"
                disabled={answer === ""}
              >
                Submit
              </button>
            </div>
          </Row>
        </form>
      </Container>
    </div>
  );
};

const mapStateToProps = (
  { questions, users, authedUserId },
  { questionId }
) => {
  // get question object
  const question = questions[questionId];

  // get user object that made this question
  const author = users[question.author];

  return {
    question,
    author,
    authedUserId,
  };
};
export default connect(mapStateToProps)(SelectAnswer);
