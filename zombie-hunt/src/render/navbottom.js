import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export default class Navbottom extends React.Component {
  render() {
    return (
      <Navbar light expand="md" className="App-footer">
        <NavbarBrand>
          <a
            className="Repo-link"
            href="https://github.com/nicksedillos/project-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the code on Github
          </a>
        </NavbarBrand>
      </Navbar>
    );
  }
}
