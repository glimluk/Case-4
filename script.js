const buttons = document.querySelector("#button-field");
// const previousButton = document.querySelector("#previous-button");
// const nextButton = document.querySelector("#next-button");



// my API key
const APIKey = "8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK";


// Mars Rover Photos
let MarsUrl;
MarsUrl = "rover.json";


function marsSearchFunction(event) {
    event.preventDefault();
    console.log("Search Start");

    fetch(MarsUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            const info = data.photos;
            const search = document.querySelector("#search").value;

            console.log(search);

            const output = info
                .filter(p => p.id == (search))
                .map(p =>
                    `<div>
                    <h3>Camera: ${p.camera.full_name}</h3>
                    <img class=mars-pic src="${p.img_src}"</img>
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
            const output = info
                .filter(c => c.data[0].title.toLowerCase().includes(search))
                .map(c =>
                    `<div>
                    <h3>Result: ${c.data[0].title}</h3>
                    <ul>${c.data[0].keywords.join("<ul></ul>")}</ul>
                    <img src="${c.links && c.links[0].href}"</img>
                    <p>${c.data[0].description}</p>
                    </div>`
                )
                .join("");

            // longer ver.
            // c.data[0] && c.data[0].title && c.data[0].title)
            // ${c.links && c.links[0].href}

            // short ver.
            // c.data[0]?.title?
            // c.links?.[0]?.href

            console.log(output);
            document.querySelector("#container").innerHTML = output;
        });

};


// https://api.nasa.gov/planetary/earth/imagery?lon=19.73&lat=-23.88&date=2019-01-01&dim=0.15&api_key=8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK
function earthSearchFunction(event) {
    event.preventDefault();
    console.log("starting...");

            const longitude = document.querySelector("#longitude").value;
            const latitude = document.querySelector("#latitude").value;

            console.log(longitude, latitude);

            const output = `<div>
            <h2>Earth Coordinates: ${latitude}, ${longitude}...</h2>
            <img class=mars-pic src="${`https://api.nasa.gov/planetary/earth/imagery?lon=${longitude}&lat=${latitude}&date=2019-01-01&dim=0.15&api_key=${APIKey}`}"
            </img>
            </div>`

            document.querySelector("#container").innerHTML = output;
        };


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

fetch




// earth
// https://api.nasa.gov/planetary/earth/imagery?lon=-46.66&lat=-23.52&date=2019-01-01&dim=0.15&api_key=8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK
// url parameters would need to be changed
