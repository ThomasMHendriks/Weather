// API key: 50b20e78bf32d353623dc0cf03889e81 (Free tier)

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    fetchWeatherData();
});


// Grab the elements do display the information in
const displayArea = document.getElementById("infoContainer");
const nameField = document.getElementById("name");
const coordField = document.getElementById("coord");
const tempField = document.getElementById("temp");
const windspeedField = document.getElementById("windspeed");
const descriptionField = document.getElementById("description");

// fetch data from API
function fetchWeatherData () {
    const location = document.getElementById("city").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=50b20e78bf32d353623dc0cf03889e81"
    fetch(url, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response.name)
            // Process the data
            let result = processData(response);

            // Display the data on the page
            displayData(result);
        })
        .catch(function(err) {
            console.log(err.message);
        });
};

function processData (data) {
    console.log(data);
    if (data.cod == "404") {
        return false;
    }
    console.log("In the process data func: " + data.name + data.weather[0].description);
    let processedData = {
        "city" : data.name,
        "country" : data.sys.country,
        "temp" : (data.main.temp - 273.15).toFixed(1),
        "windspeed" : data.wind.speed,
        "description" : data.weather[0].description,
        "lat" : data.coord.lat.toFixed(1),
        "lon" : data.coord.lon.toFixed(1)
    };
    return processedData;
}

function displayData (processedData) {
    console.log("In the displaydata: " + processedData.city);
    console.log(displayArea.style.visibility);
    displayArea.style.visibility = 'visible';
    if (processedData == false) {
        nameField.innerHTML = "The city can't be found, please try another";
        coordField.innerHTML = "";
        tempField.innerHTML = "";
        windspeedField.innerHTML = "";
        descriptionField.innerHTML = "";
        return ;
    };
    nameField.innerHTML = '<img class="icon" src="Images/City.png"> ' + processedData.city + ", " + processedData.country;
    coordField.innerHTML = '<img class="icon" src="Images/Coordinates.png"> ' + "lat: " + processedData.lat + ", lon: " + processedData.lon;
    tempField.innerHTML = '<img class="icon" src="Images/Temperature.png"> ' + processedData.temp + "°C";
    windspeedField.innerHTML = '<img class="icon" src="Images/Wind.png"> ' + "Wind speed: " + processedData.windspeed;
    descriptionField.innerHTML = "<b>Extra info: </b>" + processedData.description;
}
