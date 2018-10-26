import React from "react";
import gameboardImage from "../imgs/gameBoard/board.png"; //image path placeholder
// import database from "../firebase/firebase";
export default class BoardAndGrid extends React.Component {

  createGrid = () => {
    let grid = []
    // length of the grid
    for (let i = 1; i < 13; i++) {
      // width of the grid
      for (let j = 1; j < 18; j++) {
        grid.push(<div className="block" id={`${j},${i}`} key={`${j},${i}`}></div>);
      }
    }
    return grid;
  }

  render() {
    return (
      <div id="game-container">
        {/* Creating the grid below so the players can play on, don't expand below lel ;) */}
        <div id="grid-container">
          {this.createGrid()}
        </div>
        <div id="game-image-container">
          {<img src={gameboardImage} className="img-fluid" alt="gameboard" />}
        </div>
      </div>
    );
  }
}
