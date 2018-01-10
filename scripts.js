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

// computers turn - random move
computerTurn = () => {
  // select a random play square
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = playSquares[randomNumber];
  // check random square is blank
  if (randomSquare.textContent === "") {
    randomSquare.textContent = xoSelector === "x" ? "o" : "x";
  } else {
    return computerTurn();
  }
  turnToggle = !turnToggle;
  checkWinner(randomSquare.textContent, randomSquare.id);
};

// check for win/draw
checkWinner = (xo, id) => {
  let gameOver = false;

  // game won function
  gameWon = () => {
    info.textContent = `${xo} wins`;
    playAgainBtn.classList.remove("hide");
    playAgainBtn.addEventListener("click", resetGame);

    // remove click listeners
    playSquares.forEach(square => {
      square.removeEventListener("click", playMove);
    });
    gameOver = true;
  };

  //check for draw
  checkDraw = () => {
    for (const square of playSquares) {
      // not a draw - game in progress
      if (square.textContent === "") {
        return;
      }
    }
    // game is a draw
    gameOver = true;
    info.textContent = "Draw";
    playAgainBtn.classList.remove("hide");
    playAgainBtn.addEventListener("click", resetGame);
  };

  // checking functions
  checkRowOne = () => {
    if (
      squareOne.textContent === xo &&
      squareTwo.textContent === xo &&
      squareThree.textContent === xo
    ) {
      gameWon();
    }
  };

  checkRowTwo = () => {
    if (
      squareFour.textContent === xo &&
      squareFive.textContent === xo &&
      squareSix.textContent === xo
    ) {
      gameWon();
    }
  };

  checkRowThree = () => {
    if (
      squareSeven.textContent === xo &&
      squareEight.textContent === xo &&
      squareNine.textContent === xo
    ) {
      gameWon();
    }
  };

  checkColOne = () => {
    if (
      squareOne.textContent === xo &&
      squareFour.textContent === xo &&
      squareSeven.textContent === xo
    ) {
      gameWon();
    }
  };

  checkColTwo = () => {
    if (
      squareTwo.textContent === xo &&
      squareFive.textContent === xo &&
      squareEight.textContent === xo
    ) {
      gameWon();
    }
  };

  checkColThree = () => {
    if (
      squareThree.textContent === xo &&
      squareSix.textContent === xo &&
      squareNine.textContent === xo
    ) {
      gameWon();
    }
  };

  checkDiagOne = () => {
    if (
      squareOne.textContent === xo &&
      squareFive.textContent === xo &&
      squareNine.textContent === xo
    ) {
      gameWon();
    }
  };

  checkDiagTwo = () => {
    if (
      squareThree.textContent === xo &&
      squareFive.textContent === xo &&
      squareSeven.textContent === xo
    ) {
      gameWon();
    }
  };

  // checking on click if winning move
  switch (id) {
    case "squareOne":
      checkRowOne();
      checkColOne();
      checkDiagOne();
      break;

    case "squareTwo":
      checkRowOne();
      checkColTwo();
      break;

    case "squareThree":
      checkRowOne();
      checkColThree();
      checkDiagTwo();
      break;

    case "squareFour":
      checkRowTwo();
      checkColOne();
      break;

    case "squareFive":
      checkRowTwo();
      checkColTwo();
      checkDiagOne();
      checkDiagTwo();
      break;

    case "squareSix":
      checkRowTwo();
      checkColThree();
      break;

    case "squareSeven":
      checkRowThree();
      checkColOne();
      checkDiagTwo();
      break;

    case "squareEight":
      checkRowThree();
      checkColTwo();
      break;

    case "squareNine":
      checkRowThree();
      checkColThree();
      checkDiagOne();
      break;

    default:
      console.log("default - shouldn't have reached");
  }

  if (!gameOver) {
    // after checking for winner
    checkDraw();

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
  checkWinner(e.target.textContent, e.target.id);
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
