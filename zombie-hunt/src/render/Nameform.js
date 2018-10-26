import React from "react";
// import database from "../firebase/firebase";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    // this.props.database({ name: event.target.database.value });
    alert(this.state.name + " was submitted");
  };

  renderUserInfo = () => {
    return this.state.name;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              id="jhs"
              name={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h1>{this.state.submitted && this.renderUserInfo()}</h1>
      </div>
    );
  }
}
