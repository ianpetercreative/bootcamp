// Menu data structure
const menuLinks = [
    { text: "about", href: "/about" },
    {
        text: "catalog",
        href: "#",
        subLinks: [
            { text: "all", href: "/catalog/all" },
            { text: "top selling", href: "/catalog/top" },
            { text: "search", href: "/catalog/search" }
        ]
    },
    {
        text: "orders",
        href: "#",
        subLinks: [
            { text: "new", href: "/orders/new" },
            { text: "pending", href: "/orders/pending" },
            { text: "history", href: "/orders/history" }
        ]
    },
    {
        text: "account",
        href: "#",
        subLinks: [
            { text: "profile", href: "/account/profile" },
            { text: "sign out", href: "/account/signout" }
        ]
    }
];

const mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerText = "SEI Rocks!";
mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");
// console.log(topMenuEl);
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

// testing a rewrite of this code:
// for (let i = 0; i < menuLinks.length; i++) {
//   const navLink = document.createElement("a");
//   navLink.setAttribute("href", menuLinks[i].href);
//   navLink.innerText = menuLinks[i].text;
//   topMenuEl.appendChild(navLink);
// }

for (let menuLink of menuLinks) {
    const navLink = document.createElement("a");
    navLink.setAttribute("href", menuLink.href);
    navLink.innerText = menuLink.text;
    topMenuEl.appendChild(navLink);
    // console.log(navLink);
}

// end of testing

const subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// task 5.1
const topMenuLinks = document.querySelectorAll("#top-menu a");
let showingSubMenu = false;

// task 5.2
topMenuEl.addEventListener("click", function (evt) {
    evt.preventDefault();
    let navLink = evt.target;
    if (navLink.tagName !== "A") return;
    // console.log(navLink.textContent);
   
    // task 5.3
    if (navLink.classList.contains("active")) {
        navLink.classList.remove("active");
        showingSubMenu = false;
        subMenuEl.style.top = "0";
        return;
    }
   
    // task 5.4
    topMenuLinks.forEach(function (navLink) {
        navLink.classList.remove("active");
    });
   
    // task 5.5
    navLink.classList.add("active");
   
    // task 5.6
    const linkData = menuLinks.find(function (link) {
        return link.text === navLink.textContent;
    });
    // console.log(`linkData.subLinks = ${linkData.subLinks}`);
    showingSubMenu = true;
   
    // task 5.7
    if (showingSubMenu) {
        buildSubMenu(linkData.subLinks);
        subMenuEl.style.top = "100%";
    } else {
        subMenuEl.style.top = "0";
        mainEl.innerHTML = "<h1>about</h1>";
    };

    // task 5.8
    function buildSubMenu(array) {
        subMenuEl.innerHTML = ""; 
        link.forEach(function(dropdown){
            const dropdownEl = document.createElement('a');
            dropdownEl.setAttribute("href", dropdown.href);
            dropdownEl.textContent = dropdown.text; 
            subMenuEl.appendChild(dropdownEl);
        })
    }
});


