// my API key
const APIKey = "8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK";

// endpoint url
const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${"8uZGGWe7lasxPQhS1uvOau4cxaPGO8lxiShMIGaK"}`;

let url;
url = "rover.json";


function searchFunction(event) {
    event.preventDefault();
    console.log("Search Start");

    fetch(url)
        .then(response => response.json()) 
        .then(data => { 
            
            console.log(data);
            
            const info = data.photos;
            const search = document.querySelector("#search").value;
            
            console.log(search);
            
            const output = info
                .filter(p => p.id == search)
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