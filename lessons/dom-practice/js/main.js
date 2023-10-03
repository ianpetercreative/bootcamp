const titleEl = document.getElementById("title");
titleEl.style.textAlign = 'center';

// console.dir(titleEl);


const pEl = document.querySelector("p.cool")
pEl.style.color = 'red';
pEl.innerHTML = "Comments for <strong>Today</strong>";

// console.log(pEl); 
const visitGoogleLink = document.querySelector("a")
visitGoogleLink.setAttribute("href", "https://www.google.com")

const commentEls = document.querySelectorAll("#comments > li")
// console.log(commentEls)


for (let commentEl of commentEls) {
    commentEl.style.fontSize = "30px"
}
