const input = document.querySelector('.shorten__input');
const btn = document.querySelector('.shorten__btn');
const url = "https://news.ycombinator.com/";
let data = input.nodeValue;

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

postData(url, formData)
                .then(res => {
                    console.log(res);
                })
                .catch(() => {
                    
                })
                .finally(() => {
                    clearInputs();
                });


