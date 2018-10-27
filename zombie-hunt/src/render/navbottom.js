import React from "react";
import { Navbar } from "reactstrap";

export default class Navbottom extends React.Component {
  render() {
    return (
      <Navbar light expand="md" className="App-footer">
          <a
            className="Repo-link"
            href="https://github.com/nicksedillos/project-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the code on Github
          </a>
      </Navbar>
    );
  }
}


