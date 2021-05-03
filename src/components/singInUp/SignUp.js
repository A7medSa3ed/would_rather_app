import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Button,
  FormGroup,
  Input,
  FormFeedback,
  FormText,
  Label,
} from "reactstrap";
import { addNewUser } from "../../store/actions/users";

const SignUp = ({ users, dispatch, handleSignup }) => {
  // users, dispatch --> comming from redux connect
  // handleSignup --> comming from index of signInUp folder.

  const [username, setUserName] = useState("");
  const [validUser, setValidUser] = useState({
    valid: "",
    reason: "",
    msg: "",
  });

  const checkUser = user => {
    const isExist = users.hasOwnProperty([
      user.toLowerCase().replace(/\s/g, ""),
    ]);
    if (user.length > 20) {
      setValidUser({
        valid: "nonvalid",
        reason: "exceed",
        msg: "Name Exceed 20 character",
      });
    } else if (user.length === 0) {
      setValidUser({
        valid: "nonvalid",
        reason: "noletters",
        msg: "You Must Enter Letters",
      });
    } else if (isExist) {
      setValidUser({
        valid: "nonvalid",
        reason: "exist",
        msg: "User Is Exist",
      });
    } else if (/\d/.test(user)) {
      setValidUser({
        valid: "nonvalid",
        reason: "number",
        msg: "Name Contain Numbers",
      });
    } else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(user)) {
      setValidUser({
        valid: "nonvalid",
        reason: "specialChar",
        msg: "Name Contain Special Character",
      });
    } else {
      setValidUser({
        valid: "valid",
        reason: "",
        msg: "Sweet! that name is available",
      });

      setUserName(user);
    }
  };
  const handleSubmit = () => {
    if (validUser.valid === "valid") {
      dispatch(addNewUser(username));
      handleSignup();
    }
  };
  return (
    <div className="signup">
      <Container>
        <Row className="col-8 ml-1">
          <FormGroup>
            <Label for="username">Enter Your Name</Label>
            <Input
              valid={validUser.valid === "valid"}
              invalid={validUser.valid === "nonvalid"}
              onChange={e => checkUser(e.target.value)}
              id="username"
            />
            <FormText>Sign Up Now</FormText>
            <FormFeedback valid>{validUser.msg}</FormFeedback>
            <FormFeedback invalid="true">
              {validUser.reason === "exceed" && validUser.msg}
              {validUser.reason === "noletters" && validUser.msg}
              {validUser.reason === "exist" && validUser.msg}
              {validUser.reason === "number" && validUser.msg}
              {validUser.reason === "specialChar" && validUser.msg}
            </FormFeedback>
            <Button
              color={validUser.valid === "valid" ? "success" : "secondary"}
              className="mt-4 px-4"
              onClick={handleSubmit}
              disabled={
                validUser.valid === "nonvalid" || validUser.valid === ""
              }
            >
              Sing Up
            </Button>
            <Button
              color="link"
              className="mt-4 px-3 ml-5"
              onClick={handleSignup}
            >
              Back
            </Button>
          </FormGroup>
        </Row>
      </Container>
    </div>
  );
};
const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps)(SignUp);
