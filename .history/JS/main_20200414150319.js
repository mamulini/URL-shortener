const input = document.querySelector('.shorten__input');
const btn = document.querySelector('.shorten__btn');
const url = "https://news.ycombinator.com/";
let data = input.value;

const postData = async () => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

btn.addEventListener('click', postData()
.then(res => {
    console.log(res);
})
.catch(() => {
    
})
.finally(() => {
    clearInputs();
}));

postData(url, data)
                .then(res => {
                    console.log(res);
                })
                .catch(() => {
                    
                })
                .finally(() => {
                    clearInputs();
                });


