// INPUT NODES

// X DIST FROM APPLE
// Y DIST FROM APPLE
// X DIRECTION
// Y DIRECTION
// X POS
// Y POS
// BOARD X SIZE
// BOARD Y SIZE
// X DIST TO CLOSEST SNAKE PIECE
// Y DIST TO CLOSEST SNAKE PIECE
// X DIST TO NEAREST WALL
// Y DIST TO NEAREST WALL

class neuralNetwork {
  inputLayerSize = 10;
  amountHiddenLayers = 2;
  hiddenLayerSize = 15;
  outputLayerSize = 4;

  layers = [];

  weights = [];

  constructor() {
    //  Setting Up The Arrays Of Weights And Nodes
    for (var i = 0; i < this.amountHiddenLayers + 2; i++) {
      this.layers[i] = [];
      if (i === 0) {
        for (var j = 0; j < this.inputLayerSize; j++) {
          this.layers[i][j] = 0;
        }
      } else if (i === this.amountHiddenLayers + 1) {
        for (var j = 0; j < this.outputLayerSize; j++) {
          this.layers[i][j] = 0;
        }
      } else {
        for (var j = 0; j < this.hiddenLayerSize; j++) {
          this.layers[i][j] = 0;
        }
      }
    }
    for (var i = 1; i < this.layers.length; i++) {
      this.weights[i] = [];
      for (var j = 0; j < this.layers[i].length; j++) {
        this.weights[i][j] = [];
        for (var k = 0; k < this.layers[i - 1].length; k++) {
          this.weights[i][j][k] = 0;
        }
      }
    }

    console.log(this.layers);
    console.log(this.weights);
  }

  inForOut(
    xDistToApple,
    yDistToApple,
    xDir,
    yDir,
    xHeadPos,
    yHeadPos,
    xBoardSize,
    yBoardSize,
    xDistToNearestSnake,
    yDistToNearestSnake
  ) {
    this.layers[0] = [
      xDistToApple,
      yDistToApple,
      xDir,
      yDir,
      xHeadPos,
      yHeadPos,
      xBoardSize,
      yBoardSize,
      xDistToNearestSnake,
      yDistToNearestSnake,
    ];
    var sum = 0;
    for (var i = 1; i < this.weights.length; i++) {
      for (var j = 0; j < this.weights[i].length; j++) {
        sum = 0;
        for (var k = 0; k > this.weights[i][j].length; l++) {
          sum += this.weights[i][j][k] * this.layers[i - 1][k];
        }
        this.layer[i][j] = sum;
      }
    }

    this.layers[this.layers.length - 1] = [0.25, 0.25, 0.25, 0.25];
  }
}

function createChildNet() {}
