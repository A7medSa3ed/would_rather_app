import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { setAuthedUser } from "../../store/actions/authedUser";

class SingIn extends Component {
  // handleSignup --> comming from index of signInUp folder.
  // users, loading --> comming from redux connect

  state = {
    selectedUser: {},
    dropdownOpen: false,
  };

  toggle = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.selectedUser.id));
  };
  render() {
    const { dropdownOpen, selectedUser } = this.state;
    const authed = Object.keys(selectedUser).length;
    return (
      <div className="loggin">
        {!this.props.loading && (
          <Container>
            <Row>
              <Col className="col-lg-6 col-sm-12">
                <h6>Signin to create poll, vote and compete in leaderboard</h6>
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  <Row className="select">
                    <Col className="col-2 ">
                      <img
                        src={
                          !authed
                            ? "/images/defaultuser.png"
                            : selectedUser.avatarURL
                        }
                        alt="defualt Img"
                        style={{
                          width: "10%",
                          height: "10%",
                          borderRadius: "50%",
                          textAlign: "left",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col className="col-6">
                      <span>
                        {!authed ? "please select a user" : selectedUser.name}
                      </span>
                    </Col>
                  </Row>
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.users.map(user => (
                    <DropdownItem
                      onClick={() => this.setState({ selectedUser: user })}
                      key={user.id}
                    >
                      <>
                        <img
                          src={user.avatarURL}
                          alt={`${user.name} img`}
                          style={{
                            width: "10%",
                            height: "10%",
                            borderRadius: "50%",
                            textAlign: "center",
                            objectFit: "cover",
                            paddingRight: "10px",
                          }}
                        />
                        {user.name}
                      </>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Row>
            <Row className="mt-5 col-sm-8">
              <Col className="pl-0">
                <div className="panel green ">
                  <button
                    disabled={!authed}
                    className="logginButton"
                    onClick={this.handleSubmit}
                  >
                    Loggin
                  </button>
                </div>
              </Col>
              <Col className="mr-3">
                <Button color="link" onClick={this.props.handleSignup}>
                  Create New User
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: Object.values(state.users).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  }),
  loading: state.loadingBar.default,
});
export default connect(mapStateToProps)(SingIn);
