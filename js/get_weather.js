const displayData = (data) => {
    document.querySelector("#location").innerHTML = `Weather in ${data.name}, ${data.sys.country}`;
    document.getElementById("temp").innerHTML = `${data.main.temp}°F`;
    document.getElementById("realfeel").innerHTML = `RealFeel: ${data.main.feels_like}°F`;
    document.getElementById("weather_main").innerHTML = data.weather[0].main;
    document.getElementById("weather_desc").innerHTML = data.weather[0].description;
    (data.clouds.all <= 30) ? document.getElementById("clouds").innerHTML = "Sunny"
        : (data.clouds.all <= 60) ? document.getElementById("clouds").innerHTML = "Mostly Sunny"
        : (data.clouds.all <= 70) ? document.getElementById("clouds").innerHTML = "Partly Cloudy"
        : (data.clouds.all <= 90) ? document.getElementById("clouds").innerHTML = "Mostly Cloudy"
        : document.getElementById("clouds").innerHTML = "Cloudy";
}

// Fetches the weather data from the OpenWeatherMap API and returns the data as a JSON object
// based on if city or coordinates are used as the search parameter.
const accessAPI = async (lat = 0, lon = 0, city = "") => {
    if (lat !== 0 && lon !== 0) {
        console.log("3. Search by lat/lon initiated");
        const initResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=ed1073051910972ddcd1959352a015d7`);
        const response = await initResponse.json();
        console.log(response);
        return response;
    }
    console.log("2. Search by city initiated");
    city = city.split(" ").join("%20");
    console.log(city);
    const initResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ed1073051910972ddcd1959352a015d7`);
    response = await initResponse.json();
    console.log(response);
    return response;
}


// Fetches the current location coordinates using the browser's geolocation API
// and calls the accessAPI function with the obtained latitude and longitude.
// If the user denies location access, an error message is displayed on the page.
const currentLocationFetch = () => {
    navigator.geolocation.getCurrentPosition(async function(coord) {
        const lat = coord.coords.latitude;
        const lon = coord.coords.longitude;
        console.log(`2. lat: ${lat}, lon: ${lon}`);
        const response = await accessAPI(lat, lon);
        displayData(response);
    },
        // Built in error handling for getCurrentPosition
        (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                console.log("2. Location access blocked");
                document.getElementById("error").innerHTML = "Location access blocked :(";
            }
        });
}

// Event listener for the search button. Initiates either the currentLocationFetch
// function or the accessAPI function depending on the input.
document.getElementById("weather").addEventListener("submit", async function (event) {
    event.preventDefault();
    // Grabs the input from the search bar
    const location = document.getElementById("search_text").value;
    console.log(`1. the location: ${location}`);
    // Checks if search input is blank and empty
    if (location.trim().length === 0) {
        currentLocationFetch();
    }
    else {
        // TODO: Find a way to make this wait for the API to return.
        const weatherData = await accessAPI(0, 0, location);
        displayData(weatherData);
    }
});
