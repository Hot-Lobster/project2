import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Login from "./render/login.js";
import Lobby from "./render/lobby.js";
import UserName from "./render/Username.js";
import GameSet from "./render/gameSet.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import database from "./firebase/firebase";

var FontAwesome = require("react-fontawesome");
const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: "Login",
      showProgress: false,
      role: null,
      roomId: null,
      slideDirection: "slide",
      toolbarTitle: ""
    };

    this.handleLoginComplete = this.handleLoginComplete.bind(this);
    this.handleLobbyComplete = this.handleLobbyComplete.bind(this);
    this.handleUserNameComplete = this.handleUserNameComplete.bind(this);
    this.toggleIndeterminateProgressBar = this.toggleIndeterminateProgressBar.bind(
      this
    );
    this.handleBackPressed = this.handleBackPressed.bind(this);
    this.setToolbarTitle = this.setToolbarTitle.bind(this);
  }
  handleLobbyComplete(roomId, role) {
    this.setState({
      slideDirection: "slide", // forwards
      roomId: roomId,
      role: role,
      stage: "GameSet"
    });
  }

  handleUserNameComplete() {
    this.setState({
      slideDirection: "slide", // forwards
      stage: "lobby"
    });
  }

  handleBackPressed() {
    switch (this.state.stage) {
      case "GameSet":
        this.setState({
          toolbarTitle: "",
          slideDirection: "slide-back", // slide backwards
          stage: "lobby"
        });
        break;
      case "lobby":
        this.setState({
          toolbarTitle: "",
          slideDirection: "slide-back", // slide backwards
          stage: "UserName"
        });
        break;
      case "UserName":
        // sign out first
        this.toggleIndeterminateProgressBar();

        database
          .auth()
          .signOut()
          .then(() => {
            this.setState({
              toolbarTitle: "",
              slideDirection: "slide-back", // slide backwards
              stage: "login"
            });
            this.toggleIndeterminateProgressBar();
          });
        break;
    }
  }

  setToolbarTitle(title) {
    this.setState({
      toolbarTitle: title
    });
  }

  toggleIndeterminateProgressBar(forceHide) {
    this.setState({
      showProgress: forceHide ? false : !this.state.showProgress
    });
  }

  handleLoginComplete(createdNewUser) {
    this.setState({
      slideDirection: "slide", // forwards
      stage: createdNewUser ? "UserName" : "lobby"
    });
  }

  getComponent() {
    if (this.state.stage === "login") {
      return (
        <Login
          toggleProgressBar={this.toggleIndeterminateProgressBar}
          onComplete={this.handleLoginComplete}
        />
      );
    } else if (this.state.stage === "UserName") {
      return (
        <UserName
          toggleProgressBar={this.toggleIndeterminateProgressBar}
          onComplete={this.handleUserNameComplete}
        />
      );
    } else if (this.state.stage === "lobby") {
      return <Lobby onComplete={this.handleLobbyComplete} />;
    } else if (this.state.stage === "GameSet") {
      return <GameSet roomId={this.state.roomId} role={this.state.role} />;
    }
  }
  render() {
    var showProgress = this.state.showProgress ? "" : "hidden";
    var showToolbar =
      this.state.stage === "UserName" ||
      this.state.stage === "lobby" ||
      this.state.stage === "GameSet"
        ? "show"
        : "hidden";

    return (
      <CSSTransitionGroup
        transitionName={this.state.slideDirection}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
        component="div"
      >
        <div className="slide-component-container" key={this.state.stage}>
          <div className={showToolbar + " toolbar"}>
            <div>
              <FontAwesome
                onClick={this.handleBackPressed}
                name="long-arrow-left"
                size="2x"
                inverse
              />
              <div className="title">{this.state.toolbarTitle}</div>
            </div>
          </div>

          <div className={showProgress + " linear-progress"}>
            <LinearProgress mode="indeterminate" />
          </div>
          {this.getComponent()}
        </div>
      </CSSTransitionGroup>
    );
  }
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Game />
  </MuiThemeProvider>
);

export default App;
