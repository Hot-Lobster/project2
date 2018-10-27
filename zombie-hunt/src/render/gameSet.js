import React, { Component } from "react";
import BoardAndGrid from "./boardAndGrid.js";
import Navtop from "./navtop.js";
import Navbottom from "./navbottom.js";
import GameControls from "./gameControls.js";
import { Container, Row, Col } from "reactstrap";
import "../index.css";

export default class GameSet extends Component {
  Render() {
    return (
      <Container className="contain">
        <Row>
          <Col>
            <Navtop />
          </Col>
        </Row>
        <Row>
          <Col>
            <BoardAndGrid />
          </Col>
        </Row>
        <Row>
          <Col>
            <GameControls />
          </Col>
        </Row>
        <Row>
          <Navbottom />
        </Row>
      </Container>
    );
  }
}
