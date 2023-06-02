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
  e = 2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274;
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
          this.weights[i][j][k] = random(0, 5);
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
        for (var k = 0; k < this.weights[i][j].length; k++) {
          sum += this.weights[i][j][k] * this.layers[i - 1][j];
        }
        this.layers[i][j] = 1 / (1 + pow(this.e, 0 - sum));
      }
    }
    console.log(this.layers);
    sum = 0;
    for (var i = 0; i < this.layers[this.layers.length - 1].length; i++) {
      sum += this.layers[this.layers.length - 1][i];
    }
    for (var i = 0; i < this.layers[this.layers.length - 1].length; i++) {
      this.layers[this.layers.length - 1][i] =
        this.layers[this.layers.length - 1][i] / sum;
    }
  }
}

function createChildNet() {
  // The Best Of The Generation Will Have Ten Children With Slight Mutations
}
