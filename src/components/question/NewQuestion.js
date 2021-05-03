import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row } from "reactstrap";
import { saveNewQuestion } from "../../store/actions/questions";

class NewQuestion extends Component {
  // author --> comming from redux connect
  // history --> comming from Add Question Page

  state = { question1: "", question2: "" };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { author, dispatch } = this.props;
    const optionOneText = this.state.question1;
    const optionTwoText = this.state.question2;
    dispatch(saveNewQuestion({ optionOneText, optionTwoText, author }));
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="newQuestion card col-lg-6 col-sm-10">
        <Container>
          <Row>
            <h3>Would you Rather ?</h3>
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row className="mb-5">
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Question 1"
                  name="question1"
                  id="question1"
                  required
                  defaultValue={this.state.question1}
                  onChange={this.handleChange}
                />
                <label htmlFor="question1" className="form__label">
                  Question 1
                </label>
              </div>
            </Row>
            <Row>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Question 2"
                  name="question2"
                  id="question2"
                  required
                  defaultValue={this.state.question2}
                  onChange={this.handleChange}
                />
                <label htmlFor="question2" className="form__label">
                  Question 2
                </label>
              </div>
            </Row>
            <Row className="mt-5">
              <div className="panel green">
                <button type="submit">Submit</button>
              </div>
            </Row>
          </form>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ authedUserId }) => ({ author: authedUserId });
export default connect(mapStateToProps)(NewQuestion);
