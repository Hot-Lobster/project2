import React from "react";
// import database from "../firebase/firebase";

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: null,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ chat: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitted: true });
    // this.props.database({ chat: event.target.jhs.value });
    alert(this.state.chat + " was submitted");
  };

  renderUserInfo = () => {
    return this.state.chat;
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Chat:
            <input
              type="text"
              chat={this.state.chat}
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
