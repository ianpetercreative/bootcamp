
// Imperative Programming 
// A more step by step way of writing code 

// Functional/Declarative Programming 
// we write code that describes what we want to do 


// Array Iterator Methods 

// forEach 

// const friends = ["Melissa", "Marc", "Andrew", "Nick"];

// friends.forEach((friend) => {console.log(`I have a friend named ${friend}`)})

// friends.forEach((friend) => {console.log(friend.toLowerCase())})

// const nums = [1, 2, 3];
// // const squared = nums.map(function(num) {
// //     return num * num; 
// // })

// const squared = nums.map((num) => num * num)
// console.log(squared)

// const people = [
//     {name: 'Fred', town: 'Bedrock'},
//     {name: 'Susan', town: 'Miami'},
//     {name: 'John', town: 'Arcadia'}
// ]

// const els = people.map((person, idx) => {
//     const el = document.createElement('div');
//     el.innerHTML = `${person.name} <span>(${person.town})</span>`;
//     return el; 
// })

// els.forEach(el => document.body.append(el)); 

// const instructors = ["Alex", "Stephanie", "Daniel"]

// const newArray = instructors.map((name) => `${name} is awesome`)

// console.log(newArray)


// FILTER 

// const nums = [100, 2, 5, 42, 99];
// const odds = nums.filter((num) => num % 2);

// console.log(odds)

// const people = ["jerks", "nice people", "Jerks", "nice people", "nice people "];

// const nicePeople = people.filter((person) => person.toLowerCase() !== "jerks")

// console.log(nicePeople)

// const cars = [
//     { color: 'red', make: 'BMW', year: 2001 },
//     { color: 'white', make: 'Toyota', year: 2013 },
//     { color: 'black', make: 'Ford', year: 2014 },
//     { color: 'white', make: 'Tesla', year: 2016 }
// ];

// const firstWhiteCar = cars.find((car) => car.color === 'white')

// const missingCar = cars.find((car) => car.color === 'blue')

// console.log(missingCar)

// const notTooOldCar = cars.find((car) => car.year < 2014)
// console.log(notTooOldCar)

// FIND INDEX

// const idxFirstCarNewerThan2015 = cars.findIndex((car) => car.year > 2015)
// console.log(idxFirstCarNewerThan2015)

// const missingCarIdx = cars.findIndex((car) => car.year > 2020)
// console.log(missingCarIdx)

// SOME

// const hasFord = cars.some((car) => car.make === 'Ford');
// console.log(hasFord)

// const myRoom = ["evil monkey", "bed", "lamp"];
// const isEvilMonkeyInRoom = myRoom.some((item) => item === "evil monkey")
// console.log(isEvilMonkeyInRoom)


// EVERY

// const everyCarIsNewerThan2000 = cars.every((car) => car.year > 2000)
// const everyCarIsNewerThan2010 = cars.every((car) => car.year > 2010)
// console.log(everyCarIsNewerThan2000)
// console.log(everyCarIsNewerThan2010)


// REDUCE

// const nums = [25, 6, 100, 3]; 

// const sum = nums.reduce((acc, num) => acc + num, 0)
// console.log(sum)

const votes = ['Yes', 'No', 'No', 'Yes', 'Yes'];
const tally = votes.reduce((acc, vote) => {
  // Assign 1 if first time seeing a certain "type" of vote
  // otherwise increase count by 1
  acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
  return acc;
}, {});  // Note the initial value is an empty object

console.log(tally)
// tally -> {"No": 2, "Yes": 3}