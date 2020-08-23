let appID = '92a0e27f0074fb410622e99d0d6500ef';
let units = 'metric';
let searchMethod = 'zip';

function getSearchMethod(searchTerm) {
    if (searchTerm.length == 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appID}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultfromserver) {
    switch (resultfromserver.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case 'Haze':
            document.body.style.backgroundImage = 'url("haze.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        default:
            document.body.style.backgroundImage = 'url("default.jpg")';
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultfromserver.weather[0].icon + '.png';

    let resultDescription = resultfromserver.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultfromserver.main.temp) + '&#176';

    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultfromserver.wind.speed) + 'm/s';

    cityHeader.innerHTML = resultfromserver.name;

    humidityElement.innerHTML = 'Humidity level at ' + resultfromserver.main.humidity + '%';
    setPositionForWeatherInfo();

}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
    weatherContainer.style.left = `calc(50%-${weatherContainerWidth/2}px)`;
    weatherContainer.style.left = `calc(50%-${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})