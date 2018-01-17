let currentBoard = ["x", "o", "x", "x", "o", "", "", "x", ""];
const result = miniMax(currentBoard, "ai");

miniMax = (currentBoard, currentPlayer) => {
  console.log("minimax entered");
  // game won function
  mmGameWin = xo => {
    if (
      (currentBoard[0] === xo &&
        currentBoard[1] === xo &&
        currentBoard[2] === xo) ||
      (currentBoard[3] === xo &&
        currentBoard[4] === xo &&
        currentBoard[5] === xo) ||
      (currentBoard[6] === xo &&
        currentBoard[7] === xo &&
        currentBoard[8] === xo) ||
      (currentBoard[0] === xo &&
        currentBoard[3] === xo &&
        currentBoard[6] === xo) ||
      (currentBoard[1] === xo &&
        currentBoard[4] === xo &&
        currentBoard[7] === xo) ||
      (currentBoard[2] === xo &&
        currentBoard[5] === xo &&
        currentBoard[8] === xo) ||
      (currentBoard[0] === xo &&
        currentBoard[4] === xo &&
        currentBoard[8] === xo) ||
      (currentBoard[2] === xo &&
        currentBoard[4] === xo &&
        currentBoard[6] === xo)
    )
      return true;
  };

  mmGameDraw = () => {
    for (const square of playSquares) {
      // not a draw - game in progress
      if (square.textContent === "") {
        return false;
      }
    }
    return true;
  };

  // toggle turn
  // ai passed in from computerTurn() so that we are checking the win/lose of human move before making an ai move
  currentPlayer = currentPlayer === "ai" ? "human" : "ai";

  let xo;
  if (currentPlayer === "human") {
    xo = xoSelector === "x" ? "x" : "o";
  } else {
    xo = xoSelector === "x" ? "o" : "x";
  }

  // if ai's turn
  // if game won by ai +10
  if (currentPlayer === "ai" && mmGameWin(xo)) return 10;

  // if gamewon by human -10
  if (currentPlayer === "human" && mmGameWin(xo)) return -10;
  // if draw - return 0
  if (mmGameDraw()) return 0;

  // find all possible moves
  // const availableMoves = currentBoard.filter(square => square === "");

  // array for storing value of moves
  let moves = [];
  // loop over moves to find value in them
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === "") {
      currentBoard[i] = xo === "x" ? "o" : "x";
      // check value of next move - store in variable
      const tryMove = miniMax(currentBoard, currentPlayer);
      moves[i] = { score: tryMove };
      currentBoard[i] = "";
    }
  }

  let bestMove;
  if (currentPlayer === "ai") {
    let bestScore = -100;
    for (let i = 0; i < moves.length; i++)
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
  }

  if (currentPlayer === "human") {
    let bestScore = 100;
    for (let i = 0; i, moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};
