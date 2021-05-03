import React from "react";
import Leaderboard from "../components/leaderboard/Leaderboard";
const LeaderboardPage = ({ history }) => {
  // history --> comming from react router dom

  return <Leaderboard history={history} />;
};

export default LeaderboardPage;
