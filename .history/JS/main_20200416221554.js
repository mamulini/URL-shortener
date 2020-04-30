const input = document.querySelector('.shorten__input');
const shortenBtn = document.querySelector('.shorten__btn');
const url = "https://rel.ink/api/links/";
let inpuValue = input.value;

class ShortLinks {
    constructor(url, shortUrl){
        this.url = url;
        this.shortUrl = shortUrl;
    }

    static render(obj){
        const content = `
            <ul class="short-link">
                <li>${obj.url}</li>
                <li><a href="${obj.shortUrl}" target="_blank">${obj.shortUrl}</a></li>
                <li><button>Copy</button></li>
                <li><i class="far fa-window-close fa-2x"></i></li>
            </ul>    
        `;
        
        document.querySelector(".shorten__link").insertAdjacentHTML("afterbegin", content);
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


