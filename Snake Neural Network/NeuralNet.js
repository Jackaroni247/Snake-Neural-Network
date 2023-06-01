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
  inputLayer = [];
  hiddenLayers = [[], []];
  amountHiddenLayers = 2;
  hiddenLayerSize = 15;
  weights = [];
  outputLayer = [0, 0, 0, 0];
  outputLayerSize = 4;

  offBalance = 0;

  constructor() {
    for (var i = 0; i < this.amountHiddenLayers; i++) {
      for (var k = 0; k < this.hiddenLayerSize; k++) {
        this.hiddenLayers[i].push(random(0, 10));
      }
    }
    for (var i = 0; i < this.amountHiddenLayers + 1; i++) {
      this.weights.push([]);
      if (i === this.amountHiddenLayers) {
        this.offBalance = this.outputLayerSize - this.hiddenLayerSize;
      }
      for (var k = 0; k < this.hiddenLayerSize + this.offBalance; k++) {
        this.weights[i].push([]);
        if (i === 0) {
          for (var j = 0; j < this.inputLayerSize; j++) {
            this.weights[i][k].push(random(0, 10));
          }
        } else {
          for (var j = 0; j < this.hiddenLayerSize; j++) {
            this.weights[i][k].push(random(0, 10));
          }
        }
      }
    }
    console.log(this.weights);
    console.log(this.hiddenLayers);
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
    this.inputLayer = [
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
    for (var i = 0; i < this.amountHiddenLayers + 1; i++) {
      if (i != this.amountHiddenLayers) {
        for (var k = 0; k < this.hiddenLayers[i].length; k++) {
          sum = 0;
          for (var j = 0; j < this.weights[i][k].length; j++) {
            if (i === 0) {
              sum += this.weights[i][k][j] * this.inputLayer[k];
            } else {
              sum += this.weights[i][k][j] * this.hiddenLayers[i - 1][k];
            }
          }
          this.hiddenLayers[i][k] = sum;
        }
      } else {
        for (var k = 0; k < this.outputLayer.length; k++) {
          sum = 0;
          for (var j = 0; j < this.weights[i][k].length; j++) {
            sum +=
              this.weights[i][k][j] *
              this.hiddenLayers[this.hiddenLayers.length - 1];
          }
          this.outputLayer[k] = sum;
        }
      }
    }
    this.outputLayer = [0.25, 0.25, 0.25, 0.25];
  }
}

function createChildNet() {}
