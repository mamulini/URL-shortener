const input = document.querySelector('.shorten__input');
const btn = document.querySelector('.shorten__btn');
const url = "https://rel.ink/api/links/";
let url = input.value;

function getRandom(){
    let randomString = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);    return randomString();
}

const postData = async () => {
    let res = await fetch(url, {
        method: "POST",
        url : "https://news.ycombinator.com/",
        body: data
    });

    return await res.text();
};

btn.addEventListener('click', postData()
.then(res => {
    console.log(res);
})
);








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


