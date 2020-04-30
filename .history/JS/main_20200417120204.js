const input = document.querySelector('.shorten__input');
const shortenBtn = document.querySelector('.shorten__btn');

input.addEventListener("focus", () => {
    input.value = "https://";
});

class ShortLinks {
    constructor(url, shortUrl){
        this.url = url;
        this.shortUrl = shortUrl;
    }

    static render(obj){
        const content = `
            <div class="shorten__genarate">
                <span class="shorten__long-link">${obj.url}</span>
                <a class="shorten__short-link" href="${obj.shortUrl}" target="_blank">${obj.shortUrl}</a>
                <button class="shorten__copy btn--blue">Copy</button>
                <span class="shorten__close"><i class="fas fa-window-close"></i></i></span >
            </div>    
        `;
        
        document.querySelector(".shorten__links").insertAdjacentHTML("afterbegin", content);
    }
}


let storedLinks = (JSON.parse(localStorage.getItem("locaLinks")));

if (storedLinks){
    storedLinks.forEach(link => {
        ShortLinks.render(link);
    });
}else{ storedLinks = []; }



shortenBtn.addEventListener("click", () => {
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
            document.querySelector(".shorten__input").classList.add("invalid");
            document.querySelector("shorten__subtitle").style.display = "block";

            setTimeout(() => {
                document.querySelector(".shorten__input").classList.remove("invalid");
                document.querySelector("shorten__subtitle").style.display = "none";
            }, 2500);
        } 
    };

    inputHandle();
});

// .previousSibling.previousSibling.previousSibling.previousSibling.firstChild.innerText

document.querySelector(".shorten__links").addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-window-close")){
        const delUrl = e.target.parentNode.parentNode;
        storedLinks = storedLinks.filter(link => link.shortUrl != delUrl);
        //save to localStorage
        localStorage.setItem("locaLinks", JSON.stringify(storedLinks));
        //disappear from DOM
        e.target.parentNode.parentNode.remove();
    }
});

document.querySelector(".shorten").addEventListener("click", (e) => {
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
        const copy = e.target.previousElementSibling.innerHTML;
        const input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = copy;
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
});










// function getUrl(){                           
//     let protocolOk = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://');
//     if(!protocolOk) {
//         newUrl = 'http://' + url;
//         return newUrl;
//     }else {
//         return url;
//     }
// }

// function genHash(){
//     if (window.location.hash == ''){
//         window.location.hash = getRandom();
//     }
// }

// function shortUrl(){
//     let longUrl = getUrl();
//     genHash();
//     sendRequest(longurl);
// }
































// postData(url, data)
//                 .then(res => {
//                     console.log(res);
//                 })
//                 .catch(() => {
                    
//                 })
//                 .finally(() => {
//                     clearInputs();
//                 });


