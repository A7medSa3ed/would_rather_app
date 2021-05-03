import React from "react";
import { Container, Row, Col } from "reactstrap";
import QestionBox from "./../question/QestionBox";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AnsweredQuestions = ({
  answeredQuestions,
  userId,
  authedUserId,
  users,
}) => {
  // answeredQuestions,userId --> comming from parent component (index of home folder)
  // authedUserId, users --> redux connect

  return (
    <div className="answered_question">
      <Container>
        <Row>
          {answeredQuestions.length === 0 ? (
            <p>No Question Is Answered Yet</p>
          ) : (
            answeredQuestions.map(question => (
              <Col className="col-lg-6 col-sm-12 m-auto" key={question.id}>
                <Link
                  to={{
                    pathname: `/questions/${question.id}`,
                    state: { userId, tab: 1 },
                  }}
                >
                  <QestionBox
                    question={question}
                    Answered={users[authedUserId].answers.hasOwnProperty(
                      question.id
                    )}
                  />
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default connect(({ authedUserId, users }) => ({ authedUserId, users }))(
  AnsweredQuestions
);
