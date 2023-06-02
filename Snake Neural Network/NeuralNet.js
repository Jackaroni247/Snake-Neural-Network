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
      for(var i = 0; i < this.amountHiddenLayers + 2; i++) {
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
      console.log(this.layers);
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

    this.layers[this.layers.length-1] = [0.25, 0.25, 0.25, 0.25];
  }
}

function createChildNet() {}
