const displayData = (data) => {
    document["querySelector"]("#location")["innerHTML"] = `Weather in ${data["name"]}, ${data["sys"]["country"]}`;
    document["querySelector"]("#temp")["innerHTML"] = `${data["main"]["temp"]}°F`;
    document["querySelector"]("#realfeel")["innerHTML"] = `RealFeel: ${data.main.feels_like}°F`;
    document["querySelector"]("#weather_main")["innerHTML"] = data.weather[0].main;
    document["querySelector"]("#weather_desc")["innerHTML"] = data.weather[0].description;
    (data['clouds']['all'] <= 30) ? document['querySelector']("#clouds")['innerHTML'] = "Sunny"
        : (data['clouds']['all'] <= 60) ? document['querySelector']("#clouds")['innerHTML'] = "Mostly Sunny"
        : (data['clouds']['all'] <= 70) ? document['querySelector']("#clouds")['innerHTML'] = "Partly Cloudy"
        : (data['clouds']['all'] <= 90) ? document['querySelector']("#clouds")['innerHTML'] = "Mostly Cloudy"
        : document['querySelector']("#clouds")['innerHTML'] = "Cloudy";
}

// Fetches the weather data from the OpenWeatherMap API and returns the data as a JSON object
// based on if city or coordinates are used as the search parameter.
const accessAPI = async (lat = 0, lon = 0, city = "") => {
    let response = '';
    if (lat !== 0 && lon !== 0) {
        const initResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=ed1073051910972ddcd1959352a015d7`);
        response = await initResponse.json();
        return response;
    }
    city = city.split(" ").join("%20");
    const initResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=ed1073051910972ddcd1959352a015d7`);
    response = await initResponse.json();
    return response;
}


// Fetches the current location coordinates using the browser's geolocation API
// and calls the accessAPI function with the obtained latitude and longitude.
// If the user denies location access, an error message is displayed on the page.
const currentLocationFetch = () => {
    navigator['geolocation']["getCurrentPosition"](async (coord) => {
        const {latitude, longitude} = coord["coords"];
        const response = await accessAPI(latitude, longitude);
        displayData(response);
    },
        // Built in error handling for getCurrentPosition
        (error) => {
            if (error.code == error.PERMISSION_DENIED) {
                document["querySelector"]("#error")["innerHTML"] = "Location access blocked :(";
            }
        });
}

// Event listener for the search button. Initiates either the currentLocationFetch
// function or the accessAPI function depending on the input.
document["querySelector"]("#weather")["addEventListener"]("submit", async (e) => {
    e.preventDefault();
    // Grabs the input from the search bar
    const location = document["querySelector"]("#search_text")["value"];
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
