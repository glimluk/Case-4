const showButton = document.querySelector("#APOD-button");

// my API key
const APIKey = "8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK";

// APOD - Astronomy Picture of the Day
const apodEndpoint = `https://api.nasa.gov/planetary/apod?api_key=${APIKey}`;

// change to a onclick button
showButton.addEventListener("click", function () {

    const xhr = new XMLHttpRequest();

    xhr.open("GET", apodEndpoint)

    xhr.addEventListener("load", () => {

        if (xhr.status === 200 && xhr.readyState === 4) {

            const obj = JSON.parse(xhr.responseText);

            document.querySelector("#container").innerHTML =
            `<div id="result-container">
            <h4><u>Image of the Day</u></h4>
            <h2>${obj.title}</h2>
            <p><img class=image-container src="${obj.url}" </img>
            </div>`;
        }
    });

    xhr.send();

});