import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import "./index.css";
import NameForm from "./render/Nameform.js";
import BoardAndGrid from "./render/boardAndGrid.js";
import Navtop from "./render/navtop.js";
import Navbottom from "./render/navbottom.js";
import GameControls from "./render/gameControls.js";
import ChatBox from "./render/chat.js";

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Navtop />
          </Col>
        </Row>
        <Row>
          <Col>
            <NameForm />
          </Col>
          <Col>
            <BoardAndGrid />
          </Col>
        </Row>
        <Row>
          <Col>
            <GameControls />
          </Col>
          <Col>
            <ChatBox />
          </Col>
        </Row>
        <Row>
          <Navbottom />
        </Row>
      </Container>
    );
  }
}

export default App;
