// app's state (variables) 
let game;

// cached element references 
const boardEl = document.getElementById('board');
const msgEl = document.getElementById('message');

// classes
class TicTacToeGame {
    constructor(boardElement, messageElement) {
        this.boardElement = boardElement;
        this.messageElement = messageElement;
        this.squareEls = [...boardElement.querySelectorAll('div')]
    }
    
    static winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    play() {
        this.turn = 1;
        this.winner = null;
        // this.squares = ???; 
        this.render();
    }

    render() {
        console.log("Render game...")
    }

    toString() {
        return `Tic-Tac-Toe / winner -> ${this.winner}`
    }

    static about() {
        console.log("I'm the TicTacToeGame class!")
    };
}

// functions 
initialize();

function initialize() {
    game = new TicTacToeGame(boardEl, msgEl);

}
