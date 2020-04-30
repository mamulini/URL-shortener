//Class for short links
export class ShortLinks {
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
        
        document.querySelector(".short-links div").insertAdjacentHTML("afterbegin", content);
    }
}