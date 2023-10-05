// app's state (variables) 
let game;

// cached element references 
const boardEl = document.getElementById('board');
const msgEl = document.getElementById('message');
const playAgainBtn = document.querySelector('button');

// classes
class Square {
    constructor(domElement) {
        this.domElement = domElement;
        this.value = null;
        this.render();
    }

    static renderLookup = {
        '1': 'purple',
        '-1': 'orange',
        'null': 'black'
    }

    render() {
        this.domElement.style.backgroundColor = Square.renderLookup[this.value];
    }
}


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
        this.squares = this.squareEls.map(el => new Square(el));
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
    game.play();
}

playAgainBtn.addEventListener('click', initialize)