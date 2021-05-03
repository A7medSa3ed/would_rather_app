import React from "react";
import UserProfile from "../components/leaderboard/UserProfile";

const UserProfilePage = props => {
  //match, history --> comming from react-router-dom
  return (
    <UserProfile match={props.match} tabState={props.history.location.state} />
  );
};

export default UserProfilePage;
