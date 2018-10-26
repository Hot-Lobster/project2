const spawns = ["2,2","16,2","2,11","16,11"];

const zombieVision = [
  "-1,-1" /* start of first circle */,
  "0,-1",
  "1,-1",
  "1,0",
  "1,1",
  "0,1",
  "-1,1",
  "-1,0" /* end of first circle */,
  "-2,-2" /* start of second circle */,
  "-1,-2",
  "0,-2",
  "1,-2",
  "2,-2",
  "2,-1",
  "2,0",
  "2,1",
  "2,2",
  "1,2",
  "0,2",
  "-1,2",
  "-2,2",
  "-2,1",
  "-2,0",
  "-2,-1" /* end of second circle */,
  "-1,-3" /* start of third fancy circle */,
  "0,-3",
  "1,-3",
  "3,-1",
  "3,0",
  "3,1",
  "1,3",
  "0,3",
  "-1,3",
  "3,-1",
  "3,0",
  "3,-1" /* end of third fancy circle */
];

const normalVision = [
  "-1,-1",
  "0,-1",
  "1,-1",
  "1,0",
  "1,1",
  "0,1",
  "-1,1",
  "-1,0"
];

// player object
var player = {
  name: "",
  infected: false,
  position: "",
  vision: []
};

getZombieVision = player => {
  console.log("Calculating zombie vision");
  // current position pushed to the array right away
  player.vision.push(player.position);
  let currentPositionArray = player.position.split(",");
  zombieVision.forEach(function(visibleSquare) {
    let visibleSquareArray = visibleSquare.split(",");
    let newVisionX =
      parseInt(visibleSquareArray[0]) + parseInt(currentPositionArray[0]);
    let newVisionY =
      parseInt(visibleSquareArray[1]) + parseInt(currentPositionArray[1]);
    // making sure coordinates are in bounds of the grid
    if (
      newVisionX > 0 &&
      newVisionX < 18 &&
      newVisionY > 0 &&
      newVisionY < 13
    ) {
      player.vision.push(`${newVisionX},${newVisionY}`);
    }
  });
  console.log([player]); /* testing purpose */
};

getNormalVision = player => {
  console.log("Calculating normal vision");
  // current position pushed to the array right away
  player.vision.push(player.position);
  let currentPositionArray = player.position.split(",");
  normalVision.forEach(function(visibleSquare) {
    let visibleSquareArray = visibleSquare.split(",");
    let newVisionX =
      parseInt(visibleSquareArray[0]) + parseInt(currentPositionArray[0]);
    let newVisionY =
      parseInt(visibleSquareArray[1]) + parseInt(currentPositionArray[1]);
    // making sure coordinates are in bounds of the grid
    if (
      newVisionX > 0 &&
      newVisionX < 18 &&
      newVisionY > 0 &&
      newVisionY < 13
    ) {
      player.vision.push(`${newVisionX},${newVisionY}`);
    }
  });
  console.log([player]); /* testing purpose */
};

renderVision = player => {
  // if they are a zombie
  if (player.infected === true) {
    let currentPosition = player.position;
    // should update player.vision
    getZombieVision(player);
    // else they are a player
  } else {
    let currentPosition = player.position;
    // should update the player.vision
    getNormalVision(player);
  }
};

// created bob for testing purposes
var player = {
  name: "Bob",
  infected: false,
  position: "9,7",
  vision: []
};

renderVision(player);
