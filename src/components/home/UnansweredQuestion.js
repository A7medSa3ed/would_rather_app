import React from "react";
import { Container, Row, Col } from "reactstrap";
import QestionBox from "./../question/QestionBox";
import { Link } from "react-router-dom";

const UnansweredQuestion = ({ unAnsweredQuestions, Answered, userId }) => {
  // unAnsweredQuestions, Answered, userId --> parent component (index of home folder)
  return (
    <div className="unanswered_question">
      <Container>
        <Row>
          {unAnsweredQuestions.length === 0 ? (
            <p>
              {userId
                ? "There Is No Question Yet"
                : "All Questions Is Answered"}
            </p>
          ) : (
            unAnsweredQuestions.map(question => (
              <Col className="col-lg-6 col-sm-12 m-auto" key={question.id}>
                <Link
                  to={{
                    pathname: `/questions/${question.id}`,
                    state: { userId, tab: 0 },
                  }}
                >
                  <QestionBox question={question} Answered={Answered} />
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

export default UnansweredQuestion;
