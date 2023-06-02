const boardXSize = 40;
const boardYSize = 40;

var snakes = [];
var apples = [];

var highScore = 0;
var snakesPerGeneration = 10;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  for(var i = 0; i < snakesPerGeneration; i++) {
    snakes[i] = new snake;
    snakes[i].brain = new neuralNetwork;
    apples[i] = new apple;
  }
  
}

function draw() {
  clear();
  background(0);
  //drawBoard(boardXSize, boardYSize);
  if (frameCount % 5 === 0) {
    tickSnakes();
    tickApples();
    if(isAllDead()) {
      console.log("They Are All Dead");
      for(var i = 0; i < snakes.length; i++);
    }
  }
  drawSnakes();
  drawApples();
  text("HIGH SCORE: " + highScore, width / 2, 20);
}

function isAllDead() {
  for (var i = 0; i < snakes.length; i++) {
    if (snakes[i].alive === true) {
      return(false);
    }
  }
  return(true);
}

function drawBoard(xGrid, yGrid) {
  stroke(255);
  for (var i = 0; i <= xGrid; i++) {
    line((width / xGrid) * i, 0, (width / xGrid) * i, height);
  }
  for (var i = 0; i <= yGrid; i++) {
    line(0, (height / yGrid) * i, width, (height / yGrid) * i);
  }
}

function tickSnakes() {
  for (var i = 0; i < snakes.length; i++) {
    if (snakes[i].alive) {
      snakes[i].tick();
    }
  }
}

function drawSnakes() {
  for (var i = 0; i < snakes.length; i++) {
    if (snakes[i].alive) {
      snakes[i].show();
    }
  }
}

function tickApples() {
  for (var i = 0; i < apples.length; i++) {
    apples[i].tick();
  }
}

function drawApples() {
  for (var i = 0; i < apples.length; i++) {
    apples[i].show();
  }
}

function keyPressed() {
  /*
  if (keyCode === 37 || keyCode === 65) {
    if (snakes[0].xDirection === 0) {
      snakes[0].xDirection = -1;
      snakes[0].yDirection = 0;
    }
  } else if (keyCode === 38 || keyCode === 87) {
    if (snakes[0].yDirection === 0) {
      snakes[0].xDirection = 0;
      snakes[0].yDirection = -1;
    }
  } else if (keyCode === 39 || keyCode === 68) {
    if (snakes[0].xDirection === 0) {
      snakes[0].xDirection = 1;
      snakes[0].yDirection = 0;
    }
  } else if (keyCode === 40 || keyCode === 83) {
    if (snakes[0].yDirection === 0) {
      snakes[0].xDirection = 0;
      snakes[0].yDirection = 1;
    }
  } else */ if (keyCode === 32) {
    for (var i = 0; i < snakes.length; i++) {
      snakes[i].reset();
    }
    for (var i = 0; i < apples.length; i++) {
      var check = true;
      while (check) {
        apples[i].x = round(random(1, boardXSize - 1));
        apples[i].y = round(random(1, boardYSize - 1));
        check = false;
        for (var k = 0; k < snakes[apples.indexOf(apples[i])].xArr.length; k++) {
          if (
            apples[i].x === snakes[apples.indexOf(apples[i])].xArr[k] &&
            apples[i].y === snakes[apples.indexOf(apples[i])].yArr[k]
          ) {
            check = true;
          }
        }
      }
    }
  }
}
