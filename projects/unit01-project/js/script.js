/*----- constants -----*/
/*----- cached elements  -----*/
const table = document.getElementById('table'); 

const gameBoardEl = document.getElementById('game-board');

const rowEls = [...gameBoardEl.children];

// const squareEls = [document.querySelectorAll('.square')];

const players = [1, -1];



  /*----- state variables -----*/
const gameBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

let playerTurn = 1; 

let winner = null; 


  /*----- event listeners -----*/
// NEEDS:
// 1. click listener to choose a piece to move
// -- can a hover state on movable pieces  -- 
// 2. click listener for the chosen location 
// 3. Activate movePiece funtion 

  /*----- functions -----*/

  initialize(); 

  function initialize() {
    // THIS IS THE CODE THAT WILL INITIALIZE THE GAME AND SET THE STATE OF THE GAME
  }

  function render() {

  }

  function getWinner() {
    // once a player is out of chips
  }

  // maybe? 
  function canItMove() {

  }

  function movePiece(){
    // activated by event listener
    // 
    // 
  }

