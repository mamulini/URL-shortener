const input = document.querySelector('.shorten__input');
const btn = document.querySelector('.shorten__btn');
const urlApi = "https://news.ycombinator.com/";
let data = input.value;

const endpoint = "https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1";

function getRandom(){
    let randomString = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);    return random_string();
}

function geturl(){
    let url = document.getElementById('urlinput').value;                           
    let protocolOk = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://');
    if(!protocolOk) {
        newurl = 'http://' + url;
        return newurl;
    }else {return url;}
















// const postData = async () => {
//     let res = await fetch(url, {
//         method: "POST",
//         body: data
//     });

//     return await res.text();
// };

// btn.addEventListener('click', postData()
// .then(res => {
//     console.log(res);
// })
// );


















// postData(url, data)
//                 .then(res => {
//                     console.log(res);
//                 })
//                 .catch(() => {
                    
//                 })
//                 .finally(() => {
//                     clearInputs();
//                 });


