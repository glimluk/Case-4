const buttons = document.querySelector("#button-field");
// const previousButton = document.querySelector("#previous-button");
// const nextButton = document.querySelector("#next-button");



// my API key
const APIKey = "8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK";


// Mars Rover Photos
let marsUrl;
marsUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/Curiosity/photos?sol=1000&api_key=${APIKey}`;
// marsUrl = "rover.json";


function marsSearchFunction(event) {
    event.preventDefault();
    console.log("Search Start");

    fetch(marsUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            const info = data.photos;
            const search = document.querySelector("#search").value;

            console.log(search);

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

let pageNumber = 1;
let pageSizeNumber = 5;

// endpoint url
const endpoint = `https://images-api.nasa.gov/search?q=moon&page=${pageNumber}&page_size=${pageSizeNumber}`;
// https://images-api.nasa.gov/search?q=moon&page=2&page_size=6
// https://images-api.nasa.gov/search?q=moon&keywords=space&page_size=2
// video fil i json

let nasa;
nasa = "nasa.json";

function searchFunction(event, pageNumber) {
    event.preventDefault();
    console.log("Search Start");

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(endpoint);
            console.log("pageNumber", pageNumber);

            const info = data.collection.items;
            const search = document.querySelector("#search").value;

            console.log(search);

            console.log(info[0]);
            // the function will search if the titles match the search value
            // it will then display the title, keywords, image, and description
            const output = info
                .filter(c => c.data[0].title.toLowerCase().includes(search))
                .map(c =>
                    `<div id="pre-container">
                        <div>
                            <h3>Result: ${c.data[0].title}</h3>
                            <p>${c.data[0].keywords.join(", ")}</p>
                            <img class=image-container src="${c.links && c.links[0].href}"</img>
                            <p>${c.data[0].description}</p>
                        </div>
                    </div>
                    <br>`
                )
                .join("");

            // longer ver.
            // c.data[0] && c.data[0].title && c.data[0].title)
            // ${c.links && c.links[0].href}

            // short ver.
            // c.data[0]?.title?
            // c.links?.[0]?.href

            console.log(output);
            document.querySelector("#inner-container").innerHTML = output +
                `<div id="button-field">
                <button class="previous-button" onsubmit="searchFunction(event, page)">Previous</button>
                <button class="next-button" onsubmit="searchFunction(event, page)">Next</button>
            </div>`;
        });

};


// https://api.nasa.gov/planetary/earth/imagery?lon=19.73&lat=-23.88&date=2019-01-01&dim=0.15&api_key=8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK
function earthSearchFunction(event) {
    event.preventDefault();
    console.log("starting...");

    const longitude = document.querySelector("#longitude").value;
    const latitude = document.querySelector("#latitude").value;

    console.log(longitude, latitude);

    const output = `<div id="pre-container">
            <h2>Earth Coordinates: ${longitude}, ${latitude}...</h2>
            <img class=image-container src="${`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2019-01-01&dim=0.15&api_key=${APIKey}`}"</img>
            <p><a href="https://www.google.com/search?q=longitude+${longitude}+latitude+${latitude}" target=blank>Where is this?</a></p>
            </div>`

    document.querySelector("#container").innerHTML = output;
};


// buttons which would navigate between results
// these are not connected to the function and thus do not work
buttons.addEventListener("click", function (event) {

    if (event.target.classList.contains("previous-button")) {
        console.log("going back");
        pageNumber = pageNumber >= 2 ? pageNumber - 1 : pageNumber;
        console.log(pageNumber);
    }

    if (event.target.classList.contains("next-button")) {
        console.log("going forward");
        pageNumber = pageNumber + 1;
        console.log(pageNumber);
    };

});