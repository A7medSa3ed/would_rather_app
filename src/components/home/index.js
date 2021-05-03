import React, { Component } from "react";
import AnsweredQuestions from "./AnsweredQuestions";
import UnansweredQuestion from "./UnansweredQuestion";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import classnames from "classnames";

export class Index extends Component {
  state = {
    activeTab: 0,
  };
  componentDidMount() {
    // on this component is loaded, active the selected tab
    // currentTab --> comming from Home Page Compnent
    this.setState({
      activeTab: this.props.currentTab ? this.props.currentTab : 0,
    });
  }

  // toggle selected tab
  toggle = tab => {
    const { activeTab } = this.state;
    activeTab !== tab && this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
    const {
      unAnsweredQuestions,
      answeredQuestions,
      authedUserId,
      loading,
      userName,
      userQuestions,
      usersAnswers,
      userId,
    } = this.props;

    /* unAnsweredQuestions, answeredQuestions,
        authedUserId,loading, userName --> COmming From Connect Redux */
    // userQuestions, usersAnswers ,userId--> comming from User Profile Comonent

    // check if there is logged user
    if (authedUserId === "") return <Redirect to="/" />;

    return (
      <div className="homeTap">
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 0 })}
                onClick={() => {
                  this.toggle(0);
                }}
              >
                {userQuestions
                  ? `${userName}'s Questions`
                  : "UnAnswered Question"}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 1 })}
                onClick={() => {
                  this.toggle(1);
                }}
              >
                {usersAnswers ? `${userName}'s Answered` : "Answered Questions"}
              </NavLink>
            </NavItem>
          </Nav>

          {!loading && (
            <TabContent activeTab={activeTab}>
              <TabPane tabId={0}>
                <UnansweredQuestion
                  unAnsweredQuestions={
                    userQuestions ? userQuestions : unAnsweredQuestions
                  }
                  loading={loading}
                />
              </TabPane>
              <TabPane tabId={1}>
                <AnsweredQuestions
                  answeredQuestions={
                    usersAnswers ? usersAnswers : answeredQuestions
                  }
                  userId={userId}
                />
              </TabPane>
            </TabContent>
          )}
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (
  { questions, users, authedUserId, loadingBar },
  { userId }
) => {
  // AnsweredQuestions --> return questions that authed user did answer on it
  const answeredQuestions = Object.values(questions)
    .filter(question => users[authedUserId].answers.hasOwnProperty(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  // unAnsweredQuestions --> return questions that authed user didn't answer on it
  const unAnsweredQuestions = Object.values(questions)
    .filter(q => !users[authedUserId].answers.hasOwnProperty(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return {
    unAnsweredQuestions,
    answeredQuestions,
    authedUserId,
    userName: userId && users[userId].name, // get the user name for user Profile
    loading: loadingBar.default,
  };
};
export default connect(mapStateToProps)(Index);
