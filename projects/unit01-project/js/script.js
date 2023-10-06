/*----- constants -----*/
/*----- cached elements  -----*/
const tableEl = document.getElementById('table'); 

const gameBoardEl = document.getElementById('game-board');

const rowEls = [...gameBoardEl.children];

// const squareEls = [document.querySelectorAll('.square')];

const players = [1, -1];



  /*----- state variables -----*/
const gameBoard = [
  // I'll need to investigate further the values of these places on the board to deny movement into the unplayable squares 
    [null, -1, null, -1, null, -1, null, -1],
    [-1, null, -1, null, -1, null, -1, null],
    [null, -1, null, -1, null, -1, null, -1],
    [0, null, 0, null, 0, null, 0, null],
    [null, 0, null, 0, null, 0, null, 0],
    [1, null, 1, null, 1, null, 1, null],
    [null, 1, null, 1, null, 1, null, 1],
    [1, null, 1, null, 1, null, 1, null],
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
    // this will display the game board in its current state 
  }

  function changePlayer() {
    // this function will swap turns between the players 
  }

  function getWinner() {
    // once a player is out of chips
  }

  function movePiece(){
    // CHECK FOR MOVES
    // 1. check for kings 
    // 2. ** check for possible jumps - force the player into that piece(s)
    //    If multiple jumps, present those pieces as options. 
    // 3. if no jumps, check for movable pieces
    // 4. possible color change to denote movable pieces? 
    // 5. ** possible hover state on movable pieces? 
    // 
    // SELECT AND MOVE PIECE 
    // 1. Receive results of CHECK FOR MOVES
    // 2. Select a piece - activated by event listener
    // 3. click to select the piece to be moved 
    // 4. display spaces the piece can be moved
    // 5. move piece
    // 
    // Player Move options:
    // 1. SELECT a space to move to by clicking on it 
    // 2. DESELECT a piece by clicking anywhere else. ** should this message be displayed. or maybe a "cancel move button"
    //
    //
    // CHECK AFTER MOVE 
    // 1. Check for win
    // 2. Check for king
    // 3. Handle captured pieces 
    // 4. Update player turn 

    // render() 
  }

  function checkForKing(){
    // check for either player's "pucks" reaching a square opposite their starting end 
    // apply visual update 
    // update move capability for that piece 
  }

  function handleCapturedPieces() {
    // when a player jumps an opponent's puck, remove that piece from the game
  }

