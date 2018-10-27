import React, { Component } from "react";
import * as firebase from "firebase";

export default class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputRoomId: "",
      invalidRoomId: false
    };

    this.handleInputRoomId = this.handleInputRoomId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUI = this.updateUI.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
  }

  handleInputRoomId(event) {
    this.setState({
      inputRoomId: event.target.value
    });
  }

  handleSubmit(event) {
    this.updateUI(0); // reset UI
    event.preventDefault(); // don't reload, etc

    var inputName = this.state.inputName;
    var inputRoomId = this.state.inputRoomId;
    var invalid = false;

    if (inputRoomId === "") {
      this.updateUI(1);
      return;
    }

    this.props.toggleProgressBar();

    var db = firebase.database().ref();
    var ref = db.child("rooms").child(inputRoomId);

    ref.once("value", snapshot => {
      if (snapshot.val() === null) {
        this.updateUI(2);
        this.props.toggleProgressBar();
      } else {
        var uid = firebase.auth().currentUser.uid;

        if (snapshot.val().r === uid) {
          // if current user is 'r' in this room, let
          // him/her resume that role
          this.props.onComplete(inputRoomId, "r");
          this.props.toggleProgressBar();
        } else if (snapshot.val().bl === undefined) {
          // if 'bl' is unoccupied, join the room as 'bl'
          ref
            .child("bl")
            .set(uid)
            .then(() => {
              this.props.onComplete(inputRoomId, "bl");
              this.props.toggleProgressBar();
            });
        } else if (snapshot.val().bl === uid) {
          // if current user is 'bl' in this room, let
          // him/her resume that role
          this.props.onComplete(inputRoomId, "bl");
          this.props.toggleProgressBar();
        } else {
          // there's no room, update UI
          this.updateUI(3);
          this.props.toggleProgressBar();
        }
      }
    });
  }

  handleCreateRoom() {
    this.props.toggleProgressBar(); // show progress bar

    var db = firebase.database().ref();

    var roomId;
    roomId = Math.floor(100000 + Math.random() * 900000); // generate 6 digit number

    var roomData = {
      r: firebase.auth().currentUser.uid,
      id: roomId,
      state: this.generateBoard()
    };

    db.child("rooms")
      .child(roomId)
      .set(roomData)
      .then(() => {
        this.props.toggleProgressBar();
        this.props.onComplete(roomId + "", "r"); // creator will always be red, by default
      });
  }

  updateUI(status) {
    switch (status) {
      case 0: // reset
        this.setState({
          invalidRoomId: false
        });
        break;
      case 1: // invalid room id
        console.log("please enter a valid integer id");
        break;
      case 2: // room doesn't exist
        console.log("room doesn't exist");
        break;
      case 3: // room is full
        console.log("room is full");
        break;
    }
  }

  render() {
    return (
      <div id="lobby" className="container">
        <div className="wrapper center">
          <form noValidate>
            <input
              className={this.state.invalidRoomId ? "invalid" : ""}
              value={this.state.inputRoomId}
              onChange={this.handleInputRoomId}
              id="inputRoomId"
              placeholder="ID #"
              type="text"
              pattern="[0-9]*"
            />
            <div onClick={this.handleSubmit} className="done-button">
              <div className="arrow" />
            </div>
          </form>
          <div className="divider">OR</div>
          <div onClick={this.handleCreateRoom} className="create-new-room">
            <div>CREATE NEW ROOM</div>
          </div>

          <div className="message">
            You'll be given a room ID that another player can use to join you.
          </div>
        </div>
      </div>
    );
  }
}
