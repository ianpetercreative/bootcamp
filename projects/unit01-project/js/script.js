/*----- constants -----*/
/*----- cached elements  -----*/
const tableEl = document.getElementById('table');

const gameBoardEl = document.getElementById('game-board');

const rowEls = [...gameBoardEl.querySelectorAll('.row')];

const playerTurnMsg = document.getElementById('player-turn');

const winnerPopup = document.getElementById('winner-popup'); 
const winnerMsg = document.getElementById('winner-msg');


/*----- state variables -----*/
// const gameBoard = [
//   // starting game state 
//   [null, -1, null, -1, null, -1, null, -1],
//   [-1, null, -1, null, -1, null, -1, null],
//   [null, -1, null, -1, null, -1, null, -1],
//   [0, null, 0, null, 0, null, 0, null],
//   [null, 0, null, 0, null, 0, null, 0],
//   [1, null, 1, null, 1, null, 1, null],
//   [null, 1, null, 1, null, 1, null, 1],
//   [1, null, 1, null, 1, null, 1, null],
// ];

// checking win functionality 
const gameBoard = [
  // I'll need to investigate further the values of these places on the board to deny movement into the unplayable squares 
  [null, 0, null, 0, null, 0, null, 0],
  [0, null, 0, null, 0, null, 0, null],
  [null, 0, null, 0, null, 0, null, 0],
  [0, null, -1, null, 0, null, 0, null],
  [null, 2, null, 0, null, , null, 0],
  [0, null, 0, null, 0, null, 0, null],
  [null, 0, null, 0, null, 0, null, 0],
  [0, null, 0, null, 0, null, 0, null],
];

//checking king functionality
// const gameBoard = [
//   // I'll need to investigate further the values of these places on the board to deny movement into the unplayable squares 
//   [null, 0, null, 0, null, 0, null, 0],
//   [0, null, 0, null, 1, null, 0, null],
//   [null, -2, null, 0, null, 0, null, 0],
//   [0, null, 0, null, 0, null, 0, null],
//   [null, 2, null, 0, null, 0, null, 0],
//   [0, null, 0, null, 0, null, 0, null],
//   [null, 0, null, -1, null, 0, null, 0],
//   [0, null, 0, null, 0, null, 0, null],
// ];

// checking multijump functionality
// const gameBoard = [
//   // I'll need to investigate further the values of these places on the board to deny movement into the unplayable squares 
//   [null, 0, null, 0, null, 0, null, 0],
//   [0, null, 0, null, -1, null, 0, null],
//   [null, 0, null, 0, null, 0, null, 0],
//   [0, null, 1, null, 0, null, 0, null],
//   [null, 0, null, 1, null, , null, 0],
//   [0, null, 0, null, 0, null, 0, null],
//   [null, 0, null, 1, null, -1, null, 0],
//   [0, null, 0, null, 0, null, 0, null],
// ];
// how to track the king [2, -2]
// whose piece is this? positive or negative 

const playerOne = [1, 2];
const playerTwo = [-1, -2];

let playerTurn = 1;
let winner = null;

let playerPucks = [];
let playerKings = [];

let movablePucks = [];
let jumpsAvailable = [];
let multiJumps = [];
let destinations = [];

let selectedPuck = null;
let selectedPuckRow = null;
let selectedPuckCol = null;
let moveToRow = null;
let moveToCol = null;


/*----- event listeners -----*/
// NEEDS:
// 1. click listener to choose a piece to move
// -- can a hover state on movable pieces  -- 
// 2. click listener for the chosen location 
// 3. Activate movePiece funtion 

gameBoardEl.addEventListener('click', function clickHandler (evt) {
  const clickedEl = evt.target;
  const clickedElParent = clickedEl.parentElement;
  const rowIdx = parseInt(clickedElParent.dataset.row);
  const colIdx = parseInt(clickedElParent.dataset.col);
  
  if (winner) {
    return;
  }
  
  if (clickedElParent.className.includes('movable-puck')) {
    clearDestinationHighlights();
    destinations = [];
    highlightDestination(rowIdx, colIdx)
    selectedPuck = evt.target;
    selectedPuckRow = rowIdx
    selectedPuckCol = colIdx
  } else if (clickedEl.classList.contains('destination')) {
    moveToRow = parseInt(clickedEl.dataset.row);
    moveToCol = parseInt(clickedEl.dataset.col);
    if (jumpsAvailable.length > 0 || multiJumps.length > 0) {
      clearDestinationHighlights();
      jumpPuck(selectedPuck, selectedPuckRow, selectedPuckCol, moveToRow, moveToCol)

      movablePucks = [];
      possibleJumps = [];
      jumpsAvailable = [];

      checkForKings();
      checkForWinner();
    } else {


      clearDestinationHighlights();
      destinations = [];

      movePuck(selectedPuck, selectedPuckRow, selectedPuckCol, moveToRow, moveToCol);
      movablePucks = [];


      checkForKings();
      changePlayer();
      checkForWinner();
    }
  } else {

    clearDestinationHighlights();
    destinations = [];
    selectedPuck = null;
    selectedPuckRow = null;
    selectedPuckCol = null;
    movablePucks = [];

    render();
  }




})


/*----- functions -----*/

function render() {
  // iterate over gameBoad to place pucks
  for (let rowIdx = 0; rowIdx < gameBoard.length; rowIdx++) {
    const row = gameBoard[rowIdx];
    const squaresInRow = rowEls[rowIdx].querySelectorAll('.square');
    for (let sqIdx = 0; sqIdx < row.length; sqIdx++) {
      const squareValue = row[sqIdx];
      const square = squaresInRow[sqIdx];
      square.innerHTML = '';
      if (squareValue === 1) {
        const redPuck = document.createElement('div');
        redPuck.setAttribute("class", "red-puck");
        square.appendChild(redPuck);
      } else if (squareValue === -1) {
        const blackPuck = document.createElement('div');
        blackPuck.setAttribute("class", "black-puck");
        square.appendChild(blackPuck);
      } else if (squareValue === 2) {
        const redKing = document.createElement('div')
        redKing.setAttribute("class", "red-king")
        square.appendChild(redKing)
        // square.classList.add('king-container')
      } else if (squareValue === -2) {
        const blackKing = document.createElement('div');
        blackKing.setAttribute("class", "black-king");
        square.appendChild(blackKing);
        // square.classList.add('king-container')
      }
    }
  }
  // display player turn 
  // checkForWinner(); 
  if (playerTurn === 1) {
    playerTurnMsg.textContent = `Red's Turn`

  } else if (playerTurn === -1) {
    playerTurnMsg.textContent = `Black's Turn`

  }
  checkForMoves(playerTurn);
}


function changePlayer() {
  playerTurn *= -1;
}


// invoke remaining pucks and legal moves to determine a winner 
function checkForWinner() {
  playerPucks = getAllPlayerPucks(playerTurn);
  playerKings = getAllPlayerKings(playerTurn)
  // once a player is out of chips

  const currentPlayerPucks = playerPucks.length + playerKings.length
  if (currentPlayerPucks === 0) {

    winner = playerTurn * -1;
    if (winner === 1) {
      winnerMsg.textContent = `Red wins!`
      winnerPopup.style.display = "flex";

    } else if (winner === -1) {
      winnerMsg.textContent = `Black wins!`

    }
    return true; 

  } else {
    render(); 
  }

}



function getAllPlayerPucks(player) {
  playerPucks = [];
  gameBoard.forEach((row, rowIdx) => {
    row.forEach((squareValue, colIdx) => {
      if (squareValue === player) {
        playerPucks.push({ row: rowIdx, col: colIdx });
      }
    });
  });
  return playerPucks;
}

function getAllPlayerKings(player) {
  playerKings = [];
  gameBoard.forEach((row, rowIdx) => {
    row.forEach((squareValue, colIdx) => {
      if (squareValue === player * 2) {
        playerKings.push({ row: rowIdx, col: colIdx })
      }
    });
  });
  return playerKings;
}


function checkForMoves(player) {
  playerPucks = [];
  playerKings = [];
  playerPucks = getAllPlayerPucks(player);
  playerKings = getAllPlayerKings(player);
  let possibleMoves = [];
  let possibleJumps = [];

  // check normal puck movements. add to possible moves array
  playerPucks.forEach((puck) => {
    if (playerTurn === 1) {
      // player 1: forward, right 
      if (canItMove(puck.row - 1, puck.col + 1)) {
        const newRow = puck.row - 1;
        const newCol = puck.col + 1;
        possibleMoves.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol })
        // if canItMove is false, check for a jump:
      } else if (checkForOpponent(puck.row - 1, puck.col + 1)) {
        if (canItJump(puck.row - 2, puck.col + 2)) {
          const newRow = puck.row - 2;
          const newCol = puck.col + 2;
          const removePuckFromRow = puck.row - 1;
          const removePuckFromCol = puck.col + 1
          possibleJumps.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
        }
      }

      // player 1: forward, left 
      if (canItMove(puck.row - 1, puck.col - 1)) {
        const newRow = puck.row - 1;
        const newCol = puck.col - 1;
        possibleMoves.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol })
        // if canItMove is false, check for a jump: 
      } else if (checkForOpponent(puck.row - 1, puck.col - 1)) {
        if (canItJump(puck.row - 2, puck.col - 2)) {
          const newRow = puck.row - 2;
          const newCol = puck.col - 2;
          const removePuckFromRow = puck.row - 1;
          const removePuckFromCol = puck.col - 1
          possibleJumps.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
        }
      }
    }

    if (playerTurn === -1) {
      // player -1: down, left 
      if (canItMove(puck.row + 1, puck.col - 1)) {
        const newRow = puck.row + 1;
        const newCol = puck.col - 1;
        possibleMoves.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol })
        // if canItMove is false, check for a jump:
      } else if (checkForOpponent(puck.row + 1, puck.col - 1)) {
        if (canItJump(puck.row + 2, puck.col - 2)) {
          const newRow = puck.row + 2;
          const newCol = puck.col - 2;
          const removePuckFromRow = puck.row + 1;
          const removePuckFromCol = puck.col - 1
          possibleJumps.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
        }
      }

      // player -1: down, right
      if (canItMove(puck.row + 1, puck.col + 1)) {
        const newRow = puck.row + 1;
        const newCol = puck.col + 1;
        possibleMoves.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol })
        // if canItMove is false, check for a jump: 
      } else if (checkForOpponent(puck.row + 1, puck.col + 1)) {
        if (canItJump(puck.row + 2, puck.col + 2)) {
          const newRow = puck.row + 2;
          const newCol = puck.col + 2;
          const removePuckFromRow = puck.row + 1;
          const removePuckFromCol = puck.col + 1
          possibleJumps.push({ currentRow: puck.row, currentCol: puck.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
        }
      }


    }
  })

  // king movements. Only need one function since direction isn't a factor anymore 
  playerKings.forEach((king) => {
    // check up, right
    if (canItMove(king.row - 1, king.col + 1)) {
      const newRow = king.row - 1;
      const newCol = king.col + 1;
      possibleMoves.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol })
    } else if (checkForOpponent(king.row - 1, king.col + 1)) {
      if (canItJump(king.row - 2, king.col + 2)) {
        const newRow = king.row - 2;
        const newCol = king.col + 2;
        const removePuckFromRow = king.row - 1;
        const removePuckFromCol = king.col + 1
        possibleJumps.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
      }
    }

    // check up, left
    if (canItMove(king.row - 1, king.col - 1)) {
      const newRow = king.row - 1;
      const newCol = king.col - 1;
      possibleMoves.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol })
    } else if (checkForOpponent(king.row - 1, king.col - 1)) {
      if (canItJump(king.row - 2, king.col - 2)) {
        const newRow = king.row - 2;
        const newCol = king.col - 2;
        const removePuckFromRow = king.row - 1;
        const removePuckFromCol = king.col - 1
        possibleJumps.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
      }
    }


    // check down, right
    if (canItMove(king.row + 1, king.col + 1)) {
      const newRow = king.row + 1;
      const newCol = king.col + 1;
      possibleMoves.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol })
    } else if (checkForOpponent(king.row + 1, king.col + 1)) {
      if (canItJump(king.row + 2, king.col + 2)) {
        const newRow = king.row + 2;
        const newCol = king.col + 2;
        const removePuckFromRow = king.row + 1;
        const removePuckFromCol = king.col + 1
        possibleJumps.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
      }
    }


    // check down, left 
    if (canItMove(king.row + 1, king.col - 1)) {
      const newRow = king.row + 1;
      const newCol = king.col - 1;
      possibleMoves.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol })
    } else if (checkForOpponent(king.row + 1, king.col - 1)) {
      if (canItJump(king.row + 2, king.col - 2)) {
        const newRow = king.row + 2;
        const newCol = king.col - 2;
        const removePuckFromRow = king.row + 1;
        const removePuckFromCol = king.col - 1
        possibleJumps.push({ currentRow: king.row, currentCol: king.col, newRow: newRow, newCol: newCol, removePuckFromRow: removePuckFromRow, removePuckFromCol: removePuckFromCol })
      }
    }
  })

  // if jumps are possible, don't return Moves. Jumps only. 
  if (multiJumps.length > 0) {
    movablePucks = [];
    jumpsAvailable = [];
  } else if (possibleJumps.length > 0) {
    possibleMoves = []
    jumpsAvailable = possibleMoves.concat(possibleJumps);
    movablePucks = [];
  } else if (possibleMoves.length > 0) {
    movablePucks = possibleMoves
  }

  highlightMovablePucks();
  return movablePucks, jumpsAvailable, multiJumps;
}

function canItMove(row, col) {
  // debugger; 
  if (row < 0 || col < 0 || row > 7 || col > 7 || gameBoard[row][col] === null) {
    return false;
  } else if (gameBoard[row][col] === 0) {
    return true;
  }
}

// Checking for jump logic
// first, is an opponent occupying an adjacent square 
function checkForOpponent(row, col) {
  if (row < 0 || col < 0 || row > 7 || col > 7 || gameBoard[row][col] === null) {
    return false;
  } else if (gameBoard[row][col] === playerTurn * -1 || gameBoard[row][col] === playerTurn * -2) {
    return true;
  }
}

// second, if checkForOppoent is true, let's check the next space to see if it is open 
function canItJump(row, col) {
  if (row < 0 || col < 0 || row > 7 || col > 7 || gameBoard[row][col] === null) {
    return false;
  } else if (gameBoard[row][col] === 0) {
    return true;
  }
}

function highlightMovablePucks() {
  if (movablePucks.length > 0) {
    movablePucks.forEach((puck) => {
      const row = puck.currentRow;
      const col = puck.currentCol;

      const puckSquare = rowEls[row].querySelectorAll('.square')[col]
      puckSquare.classList.add('movable-puck');
    })
  } else if (jumpsAvailable.length > 0) {
    jumpsAvailable.forEach((jump) => {
      const row = jump.currentRow;
      const col = jump.currentCol;

      const puckSquare = rowEls[row].querySelectorAll('.square')[col]
      puckSquare.classList.add('movable-puck');
    })
  } else if (multiJumps.length > 0) {
    multiJumps.forEach((jump) => {
      const row = jump.currentRow;
      const col = jump.currentCol;

      const puckSquare = rowEls[row].querySelectorAll('.square')[col]
      puckSquare.classList.add('movable-puck');
    })
    // console.log('its pizza time')
  }
}


function highlightDestination(row, col) {
  if (movablePucks.length > 0) {
    movablePucks.forEach((puck) => {
      const row = puck.currentRow;
      const col = puck.currentCol;

      const puckSquare = rowEls[row].querySelectorAll('.square')[col]
      puckSquare.classList.remove('movable-puck')
    })

    for (let i = 0; i < movablePucks.length; i++) {
      if (row === movablePucks[i].currentRow && col === movablePucks[i].currentCol) {
        destinations.push({ newRow: movablePucks[i].newRow, newCol: movablePucks[i].newCol })
      }
    }

    destinations.forEach((destination) => {
      const row = destination.newRow;
      const col = destination.newCol;
      const possibleDestination = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      possibleDestination.classList.add(`destination`)

    })
  } else if (jumpsAvailable.length > 0) {
    jumpsAvailable.forEach((jump) => {
      const row = jump.currentRow;
      const col = jump.currentCol;

      const puckSquare = rowEls[row].querySelectorAll('.square')[col]
      puckSquare.classList.remove('movable-puck')
    })

    for (let i = 0; i < jumpsAvailable.length; i++) {
      if (row === jumpsAvailable[i].currentRow && col === jumpsAvailable[i].currentCol) {
        destinations.push({ currentRow: jumpsAvailable[i].currentRow, currentCol: jumpsAvailable[i].currentCol, newRow: jumpsAvailable[i].newRow, newCol: jumpsAvailable[i].newCol, removePuckFromRow: jumpsAvailable[i].removePuckFromRow, removePuckFromCol: jumpsAvailable[i].removePuckFromCol })
      }
    }

    destinations.forEach((destination) => {
      const row = destination.newRow;
      const col = destination.newCol;
      const jumpedRow = destination.removePuckFromRow;
      const jumpedCol = destination.removePuckFromCol;
      const possibleDestination = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      const jumpedPuck = document.querySelector(`[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`)
      possibleDestination.classList.add(`destination`)
      jumpedPuck.classList.add(`possible-jumped-puck`)

    })
  } else if (multiJumps.length > 0) {
    multiJumps.forEach((jump) => {
      const row = jump.currentRow;
      const col = jump.currentCol;

      const puckSquare = rowEls[row].querySelectorAll('.square')[col];
      puckSquare.classList.remove('movable-puck');
    })

    for (let i = 0; i < multiJumps.length; i++) {
      if (row === multiJumps[i].currentRow && col === multiJumps[i].currentCol) {
        destinations.push({ currentRow: multiJumps[i].currentRow, currentCol: multiJumps[i].currentCol, newRow: multiJumps[i].newRow, newCol: multiJumps[i].newCol, removePuckFromRow: multiJumps[i].removePuckFromRow, removePuckFromCol: multiJumps[i].removePuckFromCol })
      }
    }

    destinations.forEach((destination) => {
      const row = destination.newRow;
      const col = destination.newCol;
      const jumpedRow = destination.removePuckFromRow;
      const jumpedCol = destination.removePuckFromCol;
      const possibleDestination = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      const jumpedPuck = document.querySelector(`[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`)
      possibleDestination.classList.add(`destination`)
      jumpedPuck.classList.add(`possible-jumped-puck`)
    })
  }
}

function clearDestinationHighlights() {
  // Get all elements with the 'destination' class
  const destinationSquares = document.querySelectorAll('.destination')
  const jumpedPucks = document.querySelectorAll('.possible-jumped-puck')
  // Loop through the destination squares and remove the 'destination' class.
  destinationSquares.forEach((square) => {
    square.classList.remove('destination');
  });
  jumpedPucks.forEach((puck) => {
    puck.classList.remove('possible-jumped-puck')
  });
}

function movePuck(selectedPuck, oldRow, oldCol, newRow, newCol) {
  const destination = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
  destination.appendChild(selectedPuck)

  const puckValue = gameBoard[oldRow][oldCol]
  gameBoard[newRow][newCol] = puckValue;
  gameBoard[oldRow][oldCol] = 0;
}

function jumpPuck(selectedPuck, oldRow, oldCol, newRow, newCol) {
  // multiJumps = []; 
  const jumpedRow = (oldRow + newRow) / 2;
  const jumpedCol = (oldCol + newCol) / 2;
  const destinationSquare = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);

  const jumpedSquare = document.querySelector(`[data-row="${jumpedRow}"][data-col="${jumpedCol}"]`);
  // debugger; 
  jumpedSquare.innerHTML = '';

  destinationSquare.appendChild(selectedPuck);
  const puckValue = gameBoard[oldRow][oldCol];
  gameBoard[newRow][newCol] = puckValue;
  gameBoard[oldRow][oldCol] = 0;
  gameBoard[jumpedRow][jumpedCol] = 0;
// debugger
  checkForMultiJump(newRow, newCol);
  // console.log(selectedPuck, newRow, newCol)
}

function checkForMultiJump(row, col) {
  const puck = gameBoard[row][col]
  multiJumps = [];
  if (puck === 1) {
    // check up left
    if (checkForOpponent(row - 1, col - 1)) {
      if (canItJump(row - 2, col - 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row - 2, newCol: col - 2, removePuckFromRow: row - 1, removePuckFromCol: col - 1 });
        render();
      }
    }
    // check up right
    if (checkForOpponent(row - 1, col + 1)) {
      if (canItJump(row - 2, col + 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row - 2, newCol: col + 2, removePuckFromRow: row - 1, removePuckFromCol: col + 1 });
        render();
      }
    }

  } else if (puck === -1) {
    // debugger

    // check down left
    if (checkForOpponent(row + 1, col - 1)) {
      if (canItJump(row + 2, col - 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row + 2, newCol: col - 2, removePuckFromRow: row + 1, removePuckFromCol: col - 1 });
        render();
      }
    }
    // check down right 
    if (checkForOpponent(row + 1, col + 1)) {
      if (canItJump(row + 2, col + 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row + 2, newCol: col + 2, removePuckFromRow: row + 1, removePuckFromCol: col + 1 });
        render();
      }
    }
  } else if (puck === 2 || puck === -2) {
    // check up left
    if (checkForOpponent(row - 1, col - 1)) {
      if (canItJump(row - 2, col - 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row - 2, newCol: col - 2, removePuckFromRow: row - 1, removePuckFromCol: col - 1 });
        render();
      }
    }
    // check up right
    if (checkForOpponent(row - 1, col + 1)) {
      if (canItJump(row - 2, col + 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row - 2, newCol: col + 2, removePuckFromRow: row - 1, removePuckFromCol: col + 1 });
        render();
      }
    }
    // check down left
    if (checkForOpponent(row + 1, col - 1)) {
      if (canItJump(row + 2, col - 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row + 2, newCol: col - 2, removePuckFromRow: row + 1, removePuckFromCol: col - 1 });
        render();
      }
    }
    // check down right 
    if (checkForOpponent(row + 1, col + 1)) {
      if (canItJump(row + 2, col + 2)) {
        multiJumps.push({ currentRow: row, currentCol: col, newRow: row + 2, newCol: col + 2, removePuckFromRow: row + 1, removePuckFromCol: col + 1 });
        render();
      }
    }
  }
  
  if (multiJumps.length === 0) {
    changePlayer(); 
  }
}


function checkForKings() {
  // check for either player's "pucks" reaching a square opposite their starting end 
  // apply visual update 
  for (let i = 0; i < gameBoard[0].length; i++) {
    if (gameBoard[0][i] === 1) {
      gameBoard[0][i] = 2;
    }
  }

  for (let i = 0; i < gameBoard[7].length; i++) {
    if (gameBoard[7][i] === -1) {
      gameBoard[7][i] = -2;
    }
  }
}


function initialize() {
  // THIS IS THE CODE THAT WILL INITIALIZE THE GAME AND SET THE STATE OF THE GAME
  render();
}


initialize();
