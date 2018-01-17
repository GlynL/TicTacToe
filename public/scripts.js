// variables for x/o of players
let huPlayer;
let aiPlayer;

// all squares
const squares = document.querySelectorAll(".grid");
// each square
const squareOne = document.querySelector("squareOne");
const squareTwo = document.querySelector("squareTwo");
const squareThree = document.querySelector("squareThree");
const squareFour = document.querySelector("squareFour");
const squareFive = document.querySelector("squareFive");
const squareSix = document.querySelector("squareSix");
const squareSeven = document.querySelector("squareSeven");
const squareEight = document.querySelector("squareEight");
const squareNine = document.querySelector("squareNine");

// info banner
const info = document.querySelector("#info");

// x/o selection
const xBtn = document.querySelector("#xBtn");
const oBtn = document.querySelector("#oBtn");

// play again
const playAgainBtn = document.querySelector("#playAgain");

handleFirstTurn = e => {
  xBtn.classList.add("hide");
  oBtn.classList.add("hide");
  xBtn.removeEventListener("click", handleFirstTurn);
  oBtn.removeEventListener("click", handleFirstTurn);
  info.textContent = "Goodluck!";
  e.target.id === "xBtn" ? humanTurn() : aiTurn();
};

setup = () => {
  // change info banner and button text
  info.textContent = "Who Begins?";
  xBtn.textContent = "You";
  oBtn.textContent = "Computer";

  // remove listeners for x/o selection
  xBtn.removeEventListener("click", handleSelection);
  oBtn.removeEventListener("click", handleSelection);
  // add new listeners to buttons
  xBtn.addEventListener("click", handleFirstTurn);
  oBtn.addEventListener("click", handleFirstTurn);
};

handleSelection = e => {
  if (e.target.id === "xBtn") {
    huPlayer = "x";
    aiPlayer = "o";
  } else {
    huPlayer = "o";
    aiPlayer = "x";
  }
  setup();
};

initialSetup = () => {
  xBtn.addEventListener("click", handleSelection);
  oBtn.addEventListener("click", handleSelection);
};

// turn current play squares into an array of board values
board = () => {
  let board = [...squares];
  for (let i = 0; i < board.length; i++) {
    // if the value is not x or o, give index value
    if (board[i].textContent === "") {
      board[i] = i;
    } else {
      board[i] = board[i].textContent;
    }
  }
  return board;
};

checkWin = (player, board) => {
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

checkDraw = board => {
  // find squares that are blank
  const availableSquares = board.filter(s => s !== "x" && s !== "o");
  if (availableSquares.length === 0) return true;
};

miniMax = (board, player) => {
  // find squares that are blank
  const availableSquares = board.filter(s => s !== "x" && s !== "o");

  // check for winning move or draw
  if (checkWin(aiPlayer, board)) return { score: 10 };
  if (checkWin(huPlayer, board)) return { score: -10 };
  if (checkDraw(board)) return { score: 0 };

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

// human turn
// ==================================================

playAgain = () => {
  playAgainBtn.classList.add("hide");
  xBtn.classList.remove("hide");
  xBtn.textContent = "X";
  oBtn.classList.remove("hide");
  oBtn.textContent = "O";
  info.textContent = "Choose Game Piece!";
  squares.forEach(s => (s.textContent = ""));
  initialSetup();
};

gameEnded = player => {
  if (player === huPlayer) info.textContent = "You Won! :)";
  else if (player === aiPlayer) info.textContent = "You Lost! :(";
  else info.textContent = "Draw! :|";
  playAgainBtn.classList.remove("hide");
  playAgainBtn.addEventListener("click", playAgain);
};

executeMove = e => {
  if (e.target.textContent === "") {
    e.target.textContent = huPlayer;
    if (checkWin(huPlayer, board())) gameEnded(huPlayer);
    else if (checkDraw(board())) gameEnded();
    else {
      squares.forEach(s => s.removeEventListener("click", executeMove));
      aiTurn();
    }
  }
};

humanTurn = () => {
  // add event listener for each square
  squares.forEach(s => s.addEventListener("click", executeMove));
};

// ai turn
// ==================================================
aiTurn = () => {
  let aiMove = miniMax(board(), aiPlayer).index;
  squares[aiMove].textContent = aiPlayer;
  if (checkWin(aiPlayer, board())) gameEnded(aiPlayer);
  else if (checkDraw(board())) gameEnded();
  else humanTurn();
};

// start game
initialSetup();
