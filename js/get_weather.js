async function accessAPI(lat=0, lon=0, city="") {
    if (lat !== 0 && lon !== 0) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ed1073051910972ddcd1959352a015d7`);
        const data = await response.json();

        console.log(data);
        document.getElementById("results").innerHTML = JSON.stringify(data);
    }
    else {
        console.log("Search by city initiated");
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed1073051910972ddcd1959352a015d7`);
        const data = await response.json();
        console.log(data);
        document.getElementById("results").innerHTML = JSON.stringify(data);
    }
}


// Fetches the current location coordinates using the browser's geolocation API and calls the accessAPI function with the obtained latitude and longitude.
// If the user denies location access, an error message is displayed on the page.
const currentLocationFetch = () => {
    navigator.geolocation.getCurrentPosition((coord) => {
        const lat = coord.coords.latitude;
        const lon = coord.coords.longitude;
        console.log(`lat: ${lat}, lon: ${lon}`);
        accessAPI(lat, lon);
    },
        // Built in error handling for getCurrentPosition
        (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                console.log("Location access blocked");
                document.getElementById("error").innerHTML = "Location access blocked :(";
            }
        });
}

// Event listener for the search button. Initiates either the currentLocationFetch function or the accessAPI function depending on the input.
document.getElementById("weather").addEventListener("submit", function (event) {
    event.preventDefault();
    // Grabs the input from the search bar
    const location = document.getElementById("search_text").value;
    console.log(`the location: ${location}`);
    // Checks if search input is blank and empty
    if (location.trim().length === 0) {
        currentLocationFetch();
    }
    else {

    }
});

// Include images from google of the place that is searched, or a current shot of the location
// There is no word limit, but I would try to keep it comprehensive and at least to 3 pages to include details about:
// -Topic, work and scope
// -Hours and division of hours
// -Accessibility checks and overview
// -Challenges faced and how you overcame them
// -Insights, take aways and future scope