// my API key
const APIKey = "8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK";


// Mars Rover Photos
let marsUrl;
marsUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?sol=1000&api_key=${APIKey}`;
// marsUrl = "rover.json";

function marsSearchFunction(event) {
    event.preventDefault();

    fetch(marsUrl)
        .then(response => response.json())
        .then(data => {

            const info = data.photos;
            const search = document.querySelector("#search").value;

            const output = info
                .filter(p => p.id == (search))
                .map(p =>
                    `<div id="result-container">
                    <h3>Camera: ${p.camera.full_name}</h3>
                    <img class=image-container src="${p.img_src}"</img>
                    </div>`
                )
                .join("");

            document.querySelector("#container").innerHTML = output;
        });

};


// NASA Image and Video Library

// example links
// https://images-api.nasa.gov/search?q=moon&page=2&page_size=6
// https://images-api.nasa.gov/search?q=moon&keywords=space&page_size=2

let pageNumber = 2;
let pageSizeNumber = 10;

// endpoint url
const endpoint = `https://images-api.nasa.gov/search?q=moon&page=${pageNumber}&page_size=${pageSizeNumber}`;

// json file of https://images-api.nasa.gov/search?q=moon
// let nasa;
// nasa = "nasa.json";

function searchFunction(event, pageNumber) {
    event.preventDefault();

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {

            const info = data.collection.items;
            const search = document.querySelector("#search").value;

            // the function will search if the titles match the search value
            // it will then display the title, keywords, image, and description
            const output = info
                .filter(c => c.data[0].title.toLowerCase().includes(search))
                .map(c =>
                    `<div id="result-container">
                        <div>
                            <h3>${c.data[0].title}</h3>
                            <p>${c.data[0].keywords.join(", ")}</p>
                            <img class=image-container src="${c.links && c.links[0].href}"</img>
                            <p>${c.data[0].description}</p>
                        </div>
                    </div>
                    <br>`
                )
                .join("");

            // alternate shorter version
            // c.data[0]?.title?
            // c.links?.[0]?.href

            document.querySelector("#inner-container").innerHTML = output +
                `<div id="button-field">
                <button class="previous-button" onsubmit="searchFunction(event, page)">Previous</button>
                <button class="next-button" onsubmit="searchFunction(event, page)">Next</button>
            </div>`;
        });

};


// Earth API
// example link
// https://api.nasa.gov/planetary/earth/imagery?lon=19.73&lat=-23.88&date=2019-01-01&dim=0.15&api_key=8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK
function earthSearchFunction(event) {
    event.preventDefault();

    const longitude = document.querySelector("#longitude").value;
    const latitude = document.querySelector("#latitude").value;

    const output = `<div id="result-container">
            <h2>Earth Coordinates: ${longitude}, ${latitude}...</h2>
            <img class=image-container src="${`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2019-01-01&dim=0.15&api_key=${APIKey}`}"</img>
            <p><a href="https://www.google.com/maps/place/${longitude}+${latitude}" target=blank>Where is this?</a></p>
            </div>`

    document.querySelector("#container").innerHTML = output;
};


// buttons which would navigate between results
// these are not connected to the function and thus do not work
buttons.addEventListener("click", function (event) {

    if (event.target.classList.contains("previous-button")) {
        pageNumber = pageNumber >= 2 ? pageNumber - 1 : pageNumber;
    }

    if (event.target.classList.contains("next-button")) {
        pageNumber = pageNumber + 1;
    };

});