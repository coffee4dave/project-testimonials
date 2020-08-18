const right = document.querySelector("#btn-right");
const left = document.querySelector("#btn-left");
const img = document.querySelector("#img-container");
const attr = document.querySelector("#attr");
const search = document.querySelector("#search");
const searchform = document.querySelector("#search-form");



// const images = [
//     "amy-shamblen-koYklSUjAXc-unsplash.jpg",
//     "catrin-johnson-ym96FAhQ8o4-unsplash.jpg",
//     "charles-deluvio-y6TY0wEnWqU-unsplash.jpg",
//     "dose-juice-Zvha13RXnZY-unsplash.jpg",
//     "hessam-hojati-bTU2mFrDyTU-unsplash.jpg"
// ];
let images = [];
let index = 0;
let searchterm = "funny animals";
init(searchterm);


searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    searchterm = search.value;
    init(searchterm);
    search.value = '';
});

right.addEventListener("click", () => {
    increaseIndex();
    img.style.backgroundImage = getImage();
    attr.innerHTML = `Photo by <a href = "https://unsplash.com/@${images[index].username}?utm_source=demo&utm_medium=referral"> ${images[index].user} </a> on <a href="https://unsplash.com/?utm_source=demo&utm_medium=referral ">Unsplash</a>`;
});

left.addEventListener("click", () => {
    decreaseIndex();
    img.style.backgroundImage = getImage();
    attr.innerHTML = `Photo by <a href = "https://unsplash.com/@${images[index].username}?utm_source=demo&utm_medium=referral"> ${images[index].user} </a> on <a href="https://unsplash.com/?utm_source=demo&utm_medium=referral ">Unsplash</a>`;
});

function getImage() {
    try {
        return "url('" + images[index].url + "')";
    } catch (error) {
        console.error(error);
    }

}

function increaseIndex() {
    index++;
    index = (index >= images.length) ? 0 : index;
}

function decreaseIndex() {
    index--;
    index = (index < 0) ? (images.length - 1) : index;
}

//========================================================

function init(query) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    images = [];
    let searchString = query;
    console.log(searchString);
    var request = new XMLHttpRequest();
    request.open('GET', `https://api-relay-dwb.herokuapp.com/api/search?q=${searchString}`, true);

    request.onload = function() {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            data.images.forEach((pics) => {
                let image = new Object();
                image.user = pics.user;
                image.username = pics.username;
                image.url = pics.url;
                images.push(image);

            });
        } else {
            console.log('error');
            console.log(data.errors);
        }
    }

    // Send request
    request.send();
    // request.addEventListener('progress', (e) => {
    //     if (e.lengthComputable) {
    //         var percentComplete = e.loaded / e.total * 100;
    //         attr.innerHTML = `Loading... ${percentComplete} complete.`;
    //     } else {
    //         // Unable to compute progress information since the total size is unknown
    //     }
    // });
    request.addEventListener('load', () => {
        img.style.backgroundImage = getImage();
        attr.innerHTML = `Photo by <a href = "https://unsplash.com/@${images[index].username}?utm_source=demo&utm_medium=referral"> ${images[index].user} </a> on <a href="https://unsplash.com/?utm_source=demo&utm_medium=referral ">Unsplash</a>`;
    });
}


// =======================================================
// function init() {
//     // Create a request variable and assign a new XMLHttpRequest object to it.
//     var request = new XMLHttpRequest();
//     request.open('GET', 'https://api.unsplash.com/search/photos/?query=blonde&per_page=100utm_source=demo&utm_medium=referral ', true);
//     request.setRequestHeader('Authorization', 'Client-ID UG-YxcUndp6I6lLO3o-OO-IsYkX7KjcpvHHkxQcQxFs');
//     // Open a new connection, using the GET request on the URL endpoint
//     // request.open('GET', 'https://api.unsplash.com/photos/?client_id=UG-YxcUndp6I6lLO3o-OO-IsYkX7KjcpvHHkxQcQxFs', true)


//     request.onload = function() {
//         // Begin accessing JSON data here
//         let data = JSON.parse(this.response);
//         console.log(data);
//         if (request.status >= 200 && request.status < 400) {
//             data.results.forEach((pics) => {
//                 let image = new Object();
//                 image.user = pics.user.name;
//                 image.username = pics.user.username;
//                 image.url = pics.urls.regular;
//                 images.push(image);

//             });
//         } else {
//             console.log('error');
//             console.log(data.errors);
//         }
//     }

//     // Send request
//     request.send();

//     request.addEventListener('loadend', () => {
//         img.style.backgroundImage = getImage();
//         attr.innerHTML = `Photo by <a href = "https://unsplash.com/@${images[index].username}?utm_source=demo&utm_medium=referral"> ${images[index].user} </a> on <a href="https://unsplash.com/?utm_source=demo&utm_medium=referral ">Unsplash</a>`;
//     });
// }
//how to connect to an api
//https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/

// env variables
// 


// https: //www.impressivewebs.com/npm-for-beginners-a-guide-for-front-end-developers/