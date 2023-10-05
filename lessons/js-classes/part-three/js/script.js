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
        // this.render();
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
        this.squareEls = [...boardElement.querySelectorAll('div')];
        // NEW CODE BELOW
        // Attach a delegated event listener
        // Arrow function is necessary to ensure 'this'
        // is set to the game object
        this.boardElement.addEventListener('click', (evt) => {
            // Obtain index of square
            const idx = this.squareEls.indexOf(evt.target);
            // Guards
            if (
                // Didn't click <div> in grid
                idx === -1 ||
                // Square already taken
                this.squares[idx].value ||
                // Game over
                this.winner
            ) return;
            // Update the square object
            this.squares[idx].value = turn;  // common typo 
            // Update other state (turn, winner)
            this.turn *= -1;
            this.winner = this.getWinner();
            // Render updated state
            this.render();
        });
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

    getWinner() {
        // Shortcut variable
        const combos = TicTacToeGame.winningCombos;
        for (let i = 0; i < combos.length; i++) {
            if (Math.abs(this.squares[combos[i][0]].value + this.squares[combos[i][1]].value + this.squares[combos[i][2]].value) === 3)
                return this.squares[combos[i][0]].value;
        }
        // Array.prototype.some iterator method!
        if (this.squares.some(square => square.value === null)) return null;
        return 'T';
    }

    render() {
        // Square objects are responsible for rendering themselves
        this.squares.forEach(square => square.render());
        // NEW CODE BELOW
        if (this.winner === 'T') {
            this.messageElement.innerHTML = 'Rats, another tie!';
        } else if (this.winner) {
            this.messageElement.innerHTML = `Player ${this.winner === 1 ? 1 : 2} Wins!`;
        } else {
            this.messageElement.innerHTML = `Player ${this.turn === 1 ? 1 : 2}'s Turn`;
        }
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