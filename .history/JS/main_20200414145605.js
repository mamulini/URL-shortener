const input = document.querySelector('.shorten__input');
const btn = document.querySelector('.shorten__btn');

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};
