async function accessAPI(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ed1073051910972ddcd1959352a015d7`);
    const weather = await response.json();
    console.log(weather);
    document.getElementById("results").innerHTML = weather[0];
}

const currentLocationFetch = () => {
    navigator.geolocation.getCurrentPosition((coord) => {
        let lat = coord.coords.latitude;
        let lon = coord.coords.longitude;
        console.log(`lat: ${lat}, lon: ${lon}`);
        accessAPI(lat, lon);
    },
        function (error) {
            if (error.code == error.PERMISSION_DENIED) {
                console.log("Location access blocked");
                document.getElementById("error").innerHTML = "Location access blocked :(";
            }
        });
}
// Gets current location latitude and longitude for potential blank searches upon window loading
// window.addEventListener("load", () => {
//     navigator.geolocation.getCurrentPosition((coord) => {
//         // Prints latitude to hidden <p> element
//         document.getElementById("lat").innerHTML = coord.coords.latitude;
//         // Prints longitude to hidden <p> element
//         document.getElementById("lon").innerHTML = coord.coords.longitude;
//         // console.log check, directly checking the hidden <p> elements to make sure they retained the correct values
//         console.log(`lat: ${document.getElementById("lat").innerHTML}, lon: ${document.getElementById("lon").innerHTML}`);
//     });
// });

document.getElementById("weather").addEventListener("submit", function (event) {
    event.preventDefault();
    // Grabs the input from the search bar
    const location = document.getElementById("search_text").value;
    console.log(`the location: ${location}`);
    // Checks if search input is blank and empty
    if (location.trim().length === 0) {
        currentLocationFetch();
    }
});

// Include images from google of the place that is searched, or a current shot of the location
// There is no word limit, but I would try to keep it comprehensive and at least to 3 pages to include details about:
// -Topic, work and scope
// -Hours and division of hours
// -Accessibility checks and overview
// -Challenges faced and how you overcame them
// -Insights, take aways and future scope