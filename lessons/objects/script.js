// const latitude = 876378246;
// const longitude = -342543523;

// const location2 = {
//     name: 'Disneyland',
//     latitude,
//     longitude,
// }

// console.log(location2)



// // let input = prompt("Give me a key")

const game = {
    title: 'Guess the number!',
    biggestNum: 100,
    smallestNum: 1,
    play: function () {
        const rndNum = Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1) + smallestNum)
    }
};

game.numGuesses = 0;

game["guesses"] = [7, 12, 1325];
// game["biggestNum"] = 101;
// // console.log(game[input])

// // console.log(game)

// // if ("numGuesses" in game) {
// //     console.log("numGuesses is in the game object")
// // }

// // delete game["biggestNum"]; 

// for (let key in game) {
//     console.log(key + ": " + game[key])
// }

// console.log(game)

