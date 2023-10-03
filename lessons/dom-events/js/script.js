// DOM Getters and Setters
// some JS to bring the HTML element into our JS
// some kind of function to set something 

// bringing an HTML element to our JS 
const btn = document.querySelector('#add-comment');
const inputEl = document.querySelector('input');
const ulEl = document.querySelector('ul');
// liEl.classList = 'button'; 
const buttons = document.querySelectorAll('.button');
// create a new li element √
// set its text to be the input value √
// append it to the ul block 
// clear our the input, so we can type something new

//event lister added, listening for a click 

btn.addEventListener('click', function (evt) {
    // create a new li element
    const newCommentEl = document.createElement('li');
    // newCommentEl.classList = "button";
    // access the input's text
    const commentText = inputEl.value;
    // add value to text of comment 
    newCommentEl.innerText = commentText;
    // append the li to the ul as the last child
    ulEl.append(newCommentEl);
    // reset our input after each submission 
    inputEl.value = "";
})

function handleClick(evt) {
    console.log(evt.target)
}

ulEl.addEventListener('click', handleClick)


// use my new buttons to overis=de my HTML and CSS
// make my background colors change

// get the buttons
const redBtn = document.querySelector('#red')
const blueBtn = document.querySelector('#blue')

// set the DOM manipulation
//

redBtn.addEventListener('click', function () {
    document.body.style.backgroundColor = "red"
})

blueBtn.addEventListener('click', function () {
    document.body.style.backgroundColor = "blue";
})

const hideBtn = document.querySelector('#hide')
const showBtn = document.querySelector('#show')

hideBtn.addEventListener('click', function () {
    ulEl.classList.add('hidden')
})

showBtn.addEventListener('click', function () {
    ulEl.classList.remove('hidden')
})