import React from "react";
import { connect } from "react-redux";
import { Row, Container } from "reactstrap";
import LeaderCard from "./LeaderCard";
const Leaderboard = ({ usersScore, authedUserId, history }) => {
  // usersScore, authedUserId--> comming from redux connect
  // history --> comming from Leader Board Page

  return (
    <div className="leaderboard card col-lg-6 col-sm-12">
      <Container>
        <Row className="mt-6 mb-4">
          <h3>Leaderboard</h3>
        </Row>
        {usersScore.map(user => (
          <div
            className="users"
            key={user.id}
            onClick={() => history.push(`/users/${user.id}`)}
          >
            <LeaderCard active={user.id === authedUserId} user={user} />
          </div>
        ))}
      </Container>
    </div>
  );
};
const mapStateToProps = ({ users, authedUserId }) => {
  const usersScore = Object.values(users)
    .map(user => user)
    .sort(
      (a, b) =>
        Number(Object.keys(b.answers).length + b.questions.length) -
        Number(Object.keys(a.answers).length + a.questions.length)
    );
  return { usersScore, authedUserId };
};
export default connect(mapStateToProps)(Leaderboard);
