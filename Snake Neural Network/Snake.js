class snake {
  xDirection = 1;
  yDirection = 0;
  xArr = [boardXSize / 2];
  yArr = [boardYSize / 2];
  alive = true;
  score = 0;
  brain;
  constructor() {
    this.brain = new neuralNetwork();
  }

  tick() {
    var nearestSnakeXDist;
    var nearestSnakeYDist;
    var nearestDist = 0;
    for (var i = 0; i < this.xArr.length / 2 - 1; i++) {
      if (
        sqrt(
          sq(this.xArr[i] - this.xArr[this.xArr.length - 1]) +
            sq(this.yArr[i] - this.yArr[this.yArr.length - 1])
        ) > nearestDist
      ) {
        nearestDist = sqrt(
          sq(this.xArr[i] - this.xArr[this.xArr.length - 1]) +
            sq(this.yArr[i] - this.yArr[this.yArr.length - 1])
        );
        nearestSnakeXDist = this.xArr[i] - this.xArr[this.xArr.length - 1];
        nearestSnakeYDist = this.yArr[i] - this.yArr[this.yArr.length - 1];
      }
    }

    this.brain.inForOut(
      apples[snakes.indexOf(this)].x - this.xArr[this.xArr.length - 1],
      apples[snakes.indexOf(this)].y - this.yArr[this.yArr.length - 1],
      this.xDirection,
      this.yDirection,
      this.xArr[this.xArr.length - 1],
      this.yArr[this.yArr.length - 1]
      //boardXSize,
      //boardYSize,
      //nearestSnakeXDist,
      //nearestSnakeYDist
    );
    var checkNum = 0;
    var maxIndex = 0;
    var check = false;
    var ranNum = random(0, 1);
    for (
      var z = 0;
      z < this.brain.layers[this.brain.layers.length - 1].length;
      z++
    ) {
      checkNum += this.brain.layers[this.brain.layers.length - 1][z];
      if (ranNum <= checkNum) {
        maxIndex = z;
        check = true;
      }
      if (check) {
        break;
      }
    }

    if (maxIndex === 0) {
      if (this.xDirection === 0) {
        this.xDirection = -1;
        this.yDirection = 0;
      }
    } else if (maxIndex === 1) {
      if (this.yDirection === 0) {
        this.xDirection = 0;
        this.yDirection = -1;
      }
    } else if (maxIndex === 2) {
      if (this.xDirection === 0) {
        this.xDirection = 1;
        this.yDirection = 0;
      }
    } else if (maxIndex === 3) {
      if (this.yDirection === 0) {
        this.xDirection = 0;
        this.yDirection = 1;
      }
    }

    this.xArr.push(this.xArr[this.xArr.length - 1] + this.xDirection);
    this.xArr.shift();

    this.yArr.push(this.yArr[this.yArr.length - 1] + this.yDirection);
    this.yArr.shift();

    if (
      this.xArr[this.xArr.length - 1] >= boardXSize ||
      this.xArr[this.xArr.length - 1] < 0
    ) {
      this.alive = false;
    }
    if (
      this.yArr[this.yArr.length - 1] >= boardYSize ||
      this.yArr[this.yArr.length - 1] < 0
    ) {
      this.alive = false;
    }

    for (var i = 0; i < this.xArr.length - 1; i++) {
      if (
        this.xArr[i] === this.xArr[this.xArr.length - 1] &&
        this.yArr[i] === this.yArr[this.yArr.length - 1]
      ) {
        this.alive = false;
      }
    }
  }
  show() {
    fill(
      (snakes.indexOf(this) / snakes.length) * 255,
      255 - (snakes.indexOf(this) / snakes.length) * 255,
      0
    );
    for (var i = 0; i < this.xArr.length; i++) {
      rect(
        (width / boardXSize) * this.xArr[i],
        (height / boardYSize) * this.yArr[i],
        width / boardXSize,
        height / boardYSize
      );
    }
  }

  reset() {
    this.xArr = [];
    this.yArr = [];
    this.xArr[0] = boardXSize / 2;
    this.yArr[0] = boardYSize / 2;
    this.score = 0;
    this.alive = true;
    this.xDirection = 1;
    this.yDirection = 0;
  }
}

class apple {
  x = round(random(1, boardXSize - 1));
  y = round(random(1, boardYSize - 1));

  tick() {
    if (
      this.x ===
        snakes[apples.indexOf(this)].xArr[
          snakes[apples.indexOf(this)].xArr.length - 1
        ] &&
      this.y ===
        snakes[apples.indexOf(this)].yArr[
          snakes[apples.indexOf(this)].yArr.length - 1
        ]
    ) {
      snakes[apples.indexOf(this)].xArr.push(this.x);
      snakes[apples.indexOf(this)].yArr.push(this.y);
      snakes[apples.indexOf(this)].score += 1;
      if (snakes[apples.indexOf(this)].score > highScore) {
        highScore = snakes[apples.indexOf(this)].score;
      }
      var check = true;
      while (check) {
        this.x = round(random(1, boardXSize - 1));
        this.y = round(random(1, boardYSize - 1));
        check = false;
        for (var k = 0; k < snakes[0].xArr.length; k++) {
          if (
            this.x === snakes[apples.indexOf(this)].xArr[k] &&
            this.y === snakes[apples.indexOf(this)].yArr[k]
          ) {
            check = true;
          }
        }
      }
    }
  }

  show() {
    fill(
      (apples.indexOf(this) / apples.length) * 255,
      255 - (apples.indexOf(this) / apples.length) * 255,
      0
    );
    ellipseMode(CENTER);
    ellipse(
      (width / boardXSize) * this.x + width / boardXSize / 2,
      (height / boardYSize) * this.y + height / boardYSize / 2,
      width / boardXSize,
      height / boardYSize
    );
  }
}
