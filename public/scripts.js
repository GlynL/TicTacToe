const huPlayer = "o";
const aiPlayer = "x";

const testBoard = ["o", 1, "x", "x", 4, "x", 6, "o", "o"];

miniMax = (board, player) => {
  // find squares that are blank
  const availableSquares = board.filter(s => s !== "x" && s !== "o");

  // function for checking a winning combination
  boardWin = player => {
    // horizontal checks
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      // vertical checks
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      // diagonal checks
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    }
  };

  // function for checking a draw (no moves left)
  boardDraw = () => {
    if (availableSquares.length === 0) return true;
  };

  // check for winning move or draw
  if (boardWin(aiPlayer)) return { score: 10 };
  if (boardWin(huPlayer)) return { score: -10 };
  if (boardDraw()) return { score: 0 };

  // save all the possible moves from current board in an array
  let moves = [];

  // loop over available moves
  for (let i = 0; i < availableSquares.length; i++) {
    // save each possible moves data in an object
    let move = {};
    // save the squares location (index in array)
    move.index = board[availableSquares[i]];
    // fill in square with current player
    board[availableSquares[i]] = player;
    // find score of move
    if (player === aiPlayer) {
      const result = miniMax(board, huPlayer);
      move.score = result.score;
    }
    if (player === huPlayer) {
      const result = miniMax(board, aiPlayer);
      move.score = result.score;
    }

    // reset board to original
    board[availableSquares[i]] = move.index;

    // save results of this move to array
    moves.push(move);
  }

  // to save bestMove in
  let bestMove;
  // if player is ai - bestScore is set to -100 - else if human 100
  let bestScore = player === aiPlayer ? -100 : 100;

  // find best move from possible moves
  moves.forEach(move => {
    if (player === aiPlayer) {
      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    } else {
      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = move;
      }
    }
  });

  return bestMove;
};

let aiMove = miniMax(testBoard, aiPlayer).index;
console.log("aiMove: ", aiMove);
