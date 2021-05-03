import React from "react";
import { Container, Row, Col, Progress, Button } from "reactstrap";
import { connect } from "react-redux";
import { formatDate } from "../../utils/helpers";

const AnswerDetails = ({ question, author, history }) => {
  // question, author --> comming from redux connect
  // questionId, history --> comming from QuestionPage

  // calculate Percentage o feach answer
  const percentage =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const optionOnePercentage =
    (question.optionOne.votes.length / percentage) * 100;
  const optionTwoPercentage =
    (question.optionTwo.votes.length / percentage) * 100;

  // get the active Tab
  const backToActiveTab = history?.location?.state
    ? history.location.state.tab
    : 1;

  /* if you enter user profile from leader board,
    so we need to save userId to go back to it's profile */
  const path =
    history.location.state.userId && `/users/${history.location.state.userId}`;

  return (
    <div className="answer_details card col-lg-6 col-sm-10">
      <Container>
        <h3 className="mt-2 mb-4">
          <p style={{ fontSize: "30px" }}>Would you rather</p>
          <span style={{ display: "block", fontSize: "20px" }}>
            {question.optionOne.text}
          </span>
          <span style={{ display: "block", padding: "10px", fontSize: "16px" }}>
            Or
          </span>
          <span style={{ display: "block", fontSize: "20px" }}>
            {question.optionTwo.text}
          </span>
        </h3>
        <Row className="align-items-center">
          <Col className="col-1 pr-0">
            <img
              src={author.avatarURL}
              alt={`${author.name} Img`}
              style={{
                width: "80%",
                height: "80%",
                borderRadius: "50%",
                textAlign: "left",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col className="col-6 pl-1">
            <div className="author_info">
              <span>{author.name}</span>
              <span>{formatDate(question?.timestamp)}</span>
            </div>
          </Col>
        </Row>
        <Col className="col-8 mb-3 mt-4">
          <div className="text-left progress-desc">
            {`${question.optionOne.text} (votes: ${
              question.optionOne.votes.length
            } |
               Percentage: ${optionOnePercentage.toFixed(1)} %)`}
          </div>
          <Progress animated value={optionOnePercentage} min={0} max={100} />
        </Col>
        <Col className="col-8 mb-0 mt-4">
          <div className="text-left progress-desc">
            {`${question.optionTwo.text} (votes: ${
              question.optionTwo.votes.length
            } |
               Percentage: ${optionTwoPercentage.toFixed(1)} %)`}
          </div>
          <Progress animated value={optionTwoPercentage} min={0} max={100} />
        </Col>
        <Col className="col-12 text-lg-right">
          <Button
            color="secondary"
            className="px-5 mt-4"
            outline
            onClick={() =>
              history.push({
                pathname: path ? path : "/",
                // send tab 1 to return user to answers active tab
                state: path ? { tab: 1 } : { tab: backToActiveTab },
              })
            }
          >
            Back
          </Button>
        </Col>
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
export default connect(mapStateToProps)(AnswerDetails);
