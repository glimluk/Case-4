const showButton = document.querySelector("#APOD-button");

// my API key
const APIKey = "8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK";

// https://images-api.nasa.gov
// https://images-api.nasa.gov/search?q=


// APOD - Astronomy Picture of the Day
const apodEndpoint = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}`;
// let k;
// k = "k.json";

// change to a onclick button
showButton.addEventListener("click", function (vent) {
    console.log("clicked");

    const xhr = new XMLHttpRequest();
    console.log("xhr", xhr);

    xhr.open("GET", apodEndpoint)

    xhr.addEventListener("load", () => {

        console.log(xhr.status);

        console.log(xhr.readyState);

        if (xhr.status === 200 && xhr.readyState === 4) {

            console.log(xhr.responseText, typeof xhr.responseText);

            const obj = JSON.parse(xhr.responseText);
            console.log("obj", obj, typeof obj);

            document.querySelector("#container").innerHTML =
            `<div>
            <h3>Image of the Day: ${obj.title}</h3>
            <p><img class=mars-pic src="${obj.url}" </img>
            </div>`;

            console.log(JSON.stringify(obj));
        }
    });

    xhr.send();

});