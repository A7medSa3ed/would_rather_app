import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../components/home";
import SingInUp from "../components/singInUp";

class HomePage extends Component {
  // authedUserId --> comming from redux connect

  render() {
    const { authedUserId } = this.props;

    // locationState --> react router push function include state that comming from AnswerDetails
    const locationState = this.props.history.location.state;

    // if locationState = 1, so return user to answers question Tab
    // if locationState = undefiend it will take the user to unAnswered Question tab
    const currentTab = locationState ? locationState.tab : 0;

    return (
      <div>
        {authedUserId !== "" ? <Home currentTab={currentTab} /> : <SingInUp />}
      </div>
    );
  }
}
const mapStateToProps = ({ authedUserId }) => ({
  authedUserId,
});
export default connect(mapStateToProps)(HomePage);
