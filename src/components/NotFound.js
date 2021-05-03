import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="main">
        <div>
          <h1>Error 404</h1>
        </div>
        <div>
          <NavLink to="/">
            <button>Go To Home</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
