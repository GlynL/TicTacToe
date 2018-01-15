// true is players turn
let turnToggle = true;

// selecting x or o
let xoSelector = "";

// true is 2 player
let twoPlayer = false;

// Info panel
const info = document.querySelector("#info");

// select squares for checking
const squareOne = document.querySelector("#squareOne");
const squareTwo = document.querySelector("#squareTwo");
const squareThree = document.querySelector("#squareThree");
const squareFour = document.querySelector("#squareFour");
const squareFive = document.querySelector("#squareFive");
const squareSix = document.querySelector("#squareSix");
const squareSeven = document.querySelector("#squareSeven");
const squareEight = document.querySelector("#squareEight");
const squareNine = document.querySelector("#squareNine");

// select all play square (grids)
const playSquares = document.querySelectorAll(".grid");

gameSetup = e => {
  xoSelector = e.target.id === "xBtn" ? "x" : "o";
  xBtn.classList.add("hide");
  oBtn.classList.add("hide");

  // add click listener for each square
  playSquares.forEach(square => {
    square.addEventListener("click", playMove);
  });
};

// play again button
const playAgainBtn = document.querySelector("#playAgain");

// selecting x or o
const xBtn = document.querySelector("#xBtn");
const oBtn = document.querySelector("#oBtn");
xBtn.addEventListener("click", gameSetup);
oBtn.addEventListener("click", gameSetup);

// one or two player
const onePlayerBtn = document.querySelector("#onePlayer");
const twoPlayerBtn = document.querySelector("#twoPlayer");
twoPlayerBtn.addEventListener("click", () => (twoPlayer = true));
onePlayerBtn.addEventListener("click", () => (twoPlayer = false));

const check = {
  // check if won
  won(xo) {
    if (
      (squareOne.textContent === xo &&
        squareTwo.textContent === xo &&
        squareThree.textContent === xo) ||
      (squareFour.textContent === xo &&
        squareFive.textContent === xo &&
        squareSix.textContent === xo) ||
      (squareSeven.textContent === xo &&
        squareEight.textContent === xo &&
        squareNine.textContent === xo) ||
      (squareOne.textContent === xo &&
        squareFour.textContent === xo &&
        squareSeven.textContent === xo) ||
      (squareTwo.textContent === xo &&
        squareFive.textContent === xo &&
        squareEight.textContent === xo) ||
      (squareThree.textContent === xo &&
        squareSix.textContent === xo &&
        squareNine.textContent === xo) ||
      (squareOne.textContent === xo &&
        squareFive.textContent === xo &&
        squareNine.textContent === xo) ||
      (squareThree.textContent === xo &&
        squareFive.textContent === xo &&
        squareSeven.textContent === xo)
    ) {
      return true;
    }
    return false;
  },

  // check if draw
  draw() {
    for (const square of playSquares) {
      // not a draw - game in progress
      if (square.textContent === "") {
        return false;
      }
    }
    return true;
  }
};

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
  if (currentPlayer === "ai" && mmGameWin(xo)) return { score: 10 };

  // if gamewon by human -10
  if (currentPlayer === "human" && mmGameWin(xo)) return { score: -10 };
  // if draw - return 0
  const availableSpots = currentBoard.filter(s => s !== "x" && s !== "o");
  if (availableSpots === 0) return { score: 0 };

  // find all possible moves

  // array for storing value of moves
  let moves = [];
  // loop over moves to find value in them
  for (let i = 0; i < availableSpots.length; i++) {
    let move = {};
    move.index = currentBoard[availableSpots[i]];
    currentBoard[availableSpots[i]] = xo === "x" ? "o" : "x";
    // check value of next move - store in variable
    const tryMove = miniMax(currentBoard, currentPlayer);
    move.score = tryMove.score;

    currentBoard[availableSpots[i]] = move.index;
    moves.push(move);
  }
  console.log(moves);

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

// computers turn - random move
computerTurn = () => {
  // select a random play square
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = playSquares[randomNumber];
  // an array of playSquares textContent
  const currentBoard = [...playSquares].map(square => {
    if (square.textContent === "x" || square.textContent === "o")
      return square.textContent;
    else {
      return "";
    }
  });
  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === "") currentBoard[i] = i;
  }
  // minimax alg
  const move = miniMax(currentBoard, "ai");
  // console.log(move);
  // check random square is blank
  turnToggle = !turnToggle;

  // need to add back in
  // checkState(randomSquare.textContent, randomSquare.id);
};

// check for win/draw
checkState = (xo, id) => {
  let gameOver = false;

  // game won function
  gameWon = xo => {
    info.textContent = `${xo} wins`;
    playAgainBtn.classList.remove("hide");
    playAgainBtn.addEventListener("click", resetGame);

    // remove click listeners
    playSquares.forEach(square => {
      square.removeEventListener("click", playMove);
    });
    gameOver = true;
  };

  // checking all possible winning combinations
  if (check.won(xo)) {
    gameWon(xo);
  }

  if (!gameOver) {
    // after checking for winner
    //check for draw
    if (check.draw()) {
      gameOver = true;
      info.textContent = "Draw";
      playAgainBtn.classList.remove("hide");
      playAgainBtn.addEventListener("click", resetGame);
    }

    // if its one player, player's turn, game isn't over
    if (!twoPlayer && turnToggle && !gameOver) {
      computerTurn();
    }
  }
};

// execute the move and toggle xo turn and check for win/draw
executeMove = e => {
  e.target.textContent = xoSelector === "x" ? "x" : "o";
  // turnToggle ? e.target.textContent = 'x' : e.target.textContent = 'o';
  checkState(e.target.textContent, e.target.id);
  turnToggle = !turnToggle;
  if (twoPlayer) {
    xoSelector = xoSelector === "x" ? "o" : "x";
  }
};

// check that square is empty when clicked
playMove = e => {
  let text = e.target.textContent;
  if (text == "") {
    executeMove(e);
  }
};

// reset game function
resetGame = () => {
  playSquares.forEach(function(square) {
    square.textContent = "";
    square.removeEventListener("click", playMove);
  });

  turnToggle = true;
  info.textContent = "Let's Play!";
  if (!playAgainBtn.classList.contains("hide"))
    playAgainBtn.classList.add("hide");
  xBtn.classList.remove("hide");
  oBtn.classList.remove("hide");
};

// reset button select & click event
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", resetGame);

// canvas for drawing animation
//  https://stackoverflow.com/questions/29911143/how-can-i-animate-the-drawing-of-text-on-a-web-page
// AI - minimax
// smaller screen compatibility

// WHAT I'VE LEARNT
// Calling a function recursively, current execution is continued (doesn't break) - need to use return 'function'
// element.classList and element.classList.contains('class')
// needed to have text in a span inside div when changing textContent so that the <button> wasn't fucked up and could still remove 'hide'
// css property - vertical-align - used on inline elements - aligns text (or other content) relative to baseline(which is the default) - 'middle' is super useful value
// https://css-tricks.com/what-is-vertical-align/
// css center vertical/horizontal -
// top: 50%;
// left: 50%;
/* When the top of the element is at the halfway mark, we can move the element back up by half of its own height to center it with the whole page. That's exactly what transform:translateY(-50%); does: */
// transform: translate(-50%, -50%);
// chrome debugger tools - vscode plugin - omg godsend!
// minimax

// take in current board state and persons turn
// check for a win/lose/draw - return as a property object
// find all available squares
// loop over squares
// save current board state in var
// set square[i] to x/o depending on person turn
// if player is 'x' call minimax with player as 'o'
// else call minmax with 'x' as player is 'o'
// save the eventual return score
// loop over all the returned scores
//

// // human
// var huPlayer = "O";
// // ai
// var aiPlayer = "X";

// // keep track of function calls
// var fc = 0;

// // finding the ultimate play on the game that favors the computer
// var bestSpot = minimax(origBoard, aiPlayer);

// //loging the results
// console.log("index: " + bestSpot.index);
// console.log("function calls: " + fc);

// // the main minimax function
// function minimax(newBoard, player) {
//   //keep track of function calls;
//   fc++;

//   //available spots
//   var availSpots = emptyIndexies(newBoard);

//   // checks for the terminal states such as win, lose, and tie and returning a value accordingly
//   if (winning(newBoard, huPlayer)) {
//     return (result.score = -10);
//   } else if (winning(newBoard, aiPlayer)) {
//     return { score: 10 };
//   } else if (availSpots.length === 0) {
//     return { score: 0 };
//   }

//   // an array to collect all the objects
//   var moves = [];

//   // loop through available spots
//   for (var i = 0; i < availSpots.length; i++) {
//     //create an object for each and store the index of that spot that was stored as a number in the object's index key
//     var move = {};
//     move.index = newBoard[availSpots[i]];

//     // set the empty spot to the current player
//     newBoard[availSpots[i]] = player;

//     //if collect the score resulted from calling minimax on the opponent of the current player
//     if (player == aiPlayer) {
//       // where we store the eventual +10,0,-10 from the current loops move
//       var result = minimax(newBoard, huPlayer);
//       move.score = result.score;
//     } else {
//       var result = minimax(newBoard, aiPlayer);
//       move.score = result.score;
//     }

//     //reset the spot to empty
//     newBoard[availSpots[i]] = move.index;

//     // push the object to the array
//     moves.push(move);
//   }

//   // if it is the computer's turn loop over the moves and choose the move with the highest score
//   var bestMove;
//   if (player === aiPlayer) {
//     var bestScore = -10000;
//     for (var i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     // else loop over the moves and choose the move with the lowest score
//     var bestScore = 10000;
//     for (var i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }

//   // return the chosen move (object) from the array to the higher depth
//   return moves[bestMove];
// }

// // returns the available spots on the board
// function emptyIndexies(board) {
//   return board.filter(s => s != "O" && s != "X");
// }

// // winning combinations using the board indexies for instace the first win could be 3 xes in a row
// function winning(board, player) {
//   if (
//     (board[0] == player && board[1] == player && board[2] == player) ||
//     (board[3] == player && board[4] == player && board[5] == player) ||
//     (board[6] == player && board[7] == player && board[8] == player) ||
//     (board[0] == player && board[3] == player && board[6] == player) ||
//     (board[1] == player && board[4] == player && board[7] == player) ||
//     (board[2] == player && board[5] == player && board[8] == player) ||
//     (board[0] == player && board[4] == player && board[8] == player) ||
//     (board[2] == player && board[4] == player && board[6] == player)
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
