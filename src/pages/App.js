import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { getIntialData } from "../store/actions/shared";
import { connect } from "react-redux";

//Nav
import Navbar from "../components/Navbar";

// pages
import HomePage from "./HomePage";
import AddQuestionPage from "./AddQuestionPage";
import LeaderboardPage from "./LeaderboardPage";
import QuestionPage from "./QuestionPage";
import UserProfilePage from "./UserProfilePage";
import Notfound from "./Notfound";

//Loading Bar
import LoadingBar from "react-redux-loading";

class App extends Component {
  // dispatch --> comming from redux connect

  componentDidMount() {
    this.props.dispatch(getIntialData());
  }
  render() {
    return (
      <>
        <LoadingBar />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/add" component={AddQuestionPage} />
            <Route exact path="/leaderboard" component={LeaderboardPage} />
            <Route exact path="/questions/:id" component={QuestionPage} />
            <Route exact path="/users/:id" component={UserProfilePage} />
            <Route component={Notfound} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect()(App);
