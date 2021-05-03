import React from "react";
import { Col, Row } from "reactstrap";
import classnames from "classnames";
const LeaderCard = ({ user, active }) => {
  //user, active --> comming from leaderboard component

  const userClass = classnames({
    "align-items-center": true,
    "pb-2": true,
    "mt-2": true,
    "mb-3": true,
    active: active,
  });

  return (
    <Row>
      <Col>
        <Row className={userClass} style={{ borderBottom: "1px solid #ccc" }}>
          <Col className="col-1 p-0">
            <img
              src={user.avatarURL}
              alt={`${user.name} Img`}
              style={{
                width: "95%",
                height: "95%",
                borderRadius: "50%",
                textAlign: "left",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col className="col-9 pl-4">
            <Row>{user.name}</Row>
            <Row className="pb-2 justify-content-between">
              <div className="details">
                Answered Questions: {Object.keys(user.answers).length} | Created
                Questions: {user.questions.length}
              </div>
            </Row>
          </Col>
          <Col className="col-2">
            <div className="text-right">
              {Number(Object.keys(user.answers).length + user.questions.length)}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default LeaderCard;
