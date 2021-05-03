import React from "react";
import { Container, Row, Col } from "reactstrap";
import QestionBox from "./../question/QestionBox";
import { Link } from "react-router-dom";

const UnansweredQuestion = ({ unAnsweredQuestions }) => {
  // unAnsweredQuestions --> parent component (index of home folder)
  return (
    <div className="unanswered_question">
      <Container>
        <Row>
          {unAnsweredQuestions.length === 0 ? (
            <p>All Questions Is Answered</p>
          ) : (
            unAnsweredQuestions.map(question => (
              <Col className="col-lg-6 col-sm-12 m-auto" key={question.id}>
                <Link to={`/questions/${question.id}`}>
                  <QestionBox question={question} Answered={false} />
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
