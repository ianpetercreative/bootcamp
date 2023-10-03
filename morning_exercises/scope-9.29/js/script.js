let someVar = 10;

function someFunc() {
    let b = 20;
    if (true) {
        console.log(b)
        console.log(someVar)
    }
}

console.log(b)
someFunc();