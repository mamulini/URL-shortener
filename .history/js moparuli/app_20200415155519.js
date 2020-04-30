//render to dom saved shorten links if exist
let storedLinks = (JSON.parse(localStorage.getItem("locaLinks")));

if (storedLinks){
    storedLinks.forEach(link => {
        ShortLinks.render(link);
    });
}else{ storedLinks = []; }


//Event - show mobile navbar when burger clicked
// import {mobileNav} from "./mobileNav.js";
// mobileNav();

//Class for short links
import ShortLinks from "./classLinks";


//Event - when typing to input show "https://" as standard
const input = document.querySelector(".shorten__input");
input.addEventListener("focus", () => {
    input.value = "https://";
});


//Event - when 'Shorten it!' button clicked, make api call, create a class ShortLinks instance and render to DOM
const shortenIt = document.querySelector(".shorten__btn");

shortenIt.addEventListener("click", () => {
    async function inputHandle(){
        const res = await fetch("https://rel.ink/api/links/", {
            method:"POST",
            body: JSON.stringify( {url: `${input.value}`} ),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.status > 200 && res.status < 400){
            const data = await res.json();

            storedLinks.push(new ShortLinks(input.value, `https://rel.ink/${data.hashid}`));
            input.value = "";

            //save to localStorage
            localStorage.setItem("locaLinks", JSON.stringify(storedLinks));

            ShortLinks.render(storedLinks[storedLinks.length - 1]);
        }else{
            document.querySelector("form input").classList.add("invalid");
            document.querySelector("form p").style.display = "block";

            setTimeout(() => {
                document.querySelector("form input").classList.remove("invalid");
                document.querySelector("form p").style.display = "none";
            }, 2500);
        } 
    };

    inputHandle();
});



//Event - when click the 'x' button delete url
document.querySelector(".shorten__handler").addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-window-close")){
        const delUrl = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.innerText;
        storedLinks = storedLinks.filter(link => link.shortUrl != delUrl);
        //save to localStorage
        localStorage.setItem("locaLinks", JSON.stringify(storedLinks));
        //disappear from DOM
        e.target.parentNode.parentNode.remove();
    }
});


//Event - if button "copy" clicked change style and copy shorten link to keyboard
document.querySelector(".shorten__handler").addEventListener("click", (e) => {
    if (e.target.innerText == "Copy"){
        //turn all copy buttons to "Copy" again (in case of they are not)
        const copyButtons = document.querySelectorAll(".shorten__handler div button");
        
        for (let i = 0; i < copyButtons.length; i++){
            console.log(copyButtons[i]);
            copyButtons[i].style.backgroundColor = "hsl(180, 66%, 49%)";
            copyButtons[i].innerText = "Copy";
        }

        e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
        e.target.innerText = "Copied!";

        //copy shorten link to keyboard
        const copy = e.target.parentNode.previousSibling.previousSibling.firstChild.innerText;
        const input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = copy;
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
});