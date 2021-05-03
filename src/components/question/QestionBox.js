import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { formatDate } from "../../utils/helpers";

function QestionBox({
  Answered,
  question,
  author,
  autheduserAns,
  authedAnswered,
}) {
  // Answered, question --> comming from AnsweredQuestion -OR- UnAnsweredQuestion
  // author, autheduserAns, authedAnswered --> comming from connect redux

  return (
    <Container>
      <div className="question_box mt-3">
        <Row className="mb-4 ">
          <div className="card">
            <h5 className="pl-2 font-weight-bold d-flex flex-md-column">
              <span>{question.optionOne.text}</span>
              <span className="py-md-2 px-sm-2">Or</span>
              <span>{question.optionTwo.text}</span>
            </h5>
            <Row className="align-items-center mt-2">
              <Col className="col-2 pr-0 text-center">
                <img
                  src={author.avatarURL}
                  alt={`${author.name} img`}
                  style={{
                    width: "75%",
                    height: "75%",
                    borderRadius: "50%",
                    textAlign: "left",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col className="col-8 pl-0 details">
                <span>
                  {author.name} {formatDate(question.timestamp)}
                </span>
              </Col>
            </Row>
            {Answered && authedAnswered && (
              <Row className="mt-1 pl-4">
                <div className="answer">
                  <hr />
                  <span>You select: </span>
                  <span>{autheduserAns}</span>
                </div>
              </Row>
            )}
          </div>
        </Row>
      </div>
    </Container>
  );
}
const mapStateToProps = ({ users, authedUserId }, { question }) => {
  //get the user that made this question
  const author = users[question.author];

  const authedUserSelection =
    question && users[authedUserId].answers[question.id];

  const autheduserAns =
    authedUserSelection && question[authedUserSelection].text;

  const authedAnswered = users[authedUserId].answers.hasOwnProperty(
    question.id
  );
  return {
    author,
    autheduserAns,
    authedAnswered,
  };
};

export default connect(mapStateToProps)(QestionBox);
