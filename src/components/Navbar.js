import React, { Component, Fragment } from "react";
import { Row, Col, Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../store/actions/authedUser";
import { Redirect } from "react-router-dom";

class Navbar extends Component {
  // authedUser, authedUserId --> comming from connect redux

  handleLogout = () => {
    this.props.dispatch(setAuthedUser(""));
  };

  render() {
    const { authedUser, authedUserId } = this.props;

    if (authedUserId === "") return <Redirect to="/" />;

    return (
      <nav>
        <Container>
          <Row className="pb-lg-0 mb-md-5 pb-md-5">
            <Col className="col-lg-3 col-sm-12 justify-content-sm-center logo">
              <h3 className="mb-0">Would You Rather</h3>
            </Col>
            {authedUserId !== "" && (
              <Fragment>
                <Col className="col-lg-4 col-sm-6 links">
                  <ul>
                    <NavLink exact to="/" activeClassName="active">
                      <li>Home</li>
                    </NavLink>
                    <NavLink to="/add" activeClassName="active">
                      <li>New Question</li>
                    </NavLink>
                    <NavLink to="/leaderboard" activeClassName="active">
                      <li>Leaderboard</li>
                    </NavLink>
                  </ul>
                </Col>
                <Col className="col-lg-1"></Col>
                <Col className="col-lg-4 col-sm-5  user-info">
                  <button className="d-block" onClick={this.handleLogout}>
                    Loggout
                  </button>
                  <span className="d-block">{authedUser.name}</span>
                  <img
                    src={authedUser.avatarURL}
                    alt={`${authedUser.name} img`}
                  />
                </Col>
              </Fragment>
            )}
          </Row>
        </Container>
      </nav>
    );
  }
}
const mapStateToProps = ({ users, authedUserId }) => {
  const authedUser = users[authedUserId];
  return {
    authedUserId,
    authedUser,
  };
};
export default connect(mapStateToProps)(Navbar);
