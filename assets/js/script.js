const apiKey = "aa86764387e724a2ce905596583a423b";

// Define variable relating to button element
const submitButton = document.getElementById('submitButton');

// Event listener to handle search request
submitButton.addEventListener('click', getApiInfo);

// Function to handle API request
function getApiInfo(event) {
    event.preventDefault();
    // Get the city input value
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        fetchWeatherData(cityInput);
        addToSearchHistory(cityInput);
    }

}

    // Fetch request to fetch weather data from weather API based on the user input city name
    function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayCurrentWeather(data);
       fetchFiveDayForecast(data.coord.lat, data.coord.lon);
        })
    
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

//function for displaying current weather 
function displayCurrentWeather(data) {
    const currentWeather =document.getElementById('current-weather');
    currentWeather.innerHTML = '';
}

//function to fetch 5 day forecase info
function fetchFiveDayForecast(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        displayFiveDayForecast(data);
    })
    .catch(error => {
        console.error('Error fetching five-day forecast data:', error);
    });
}


// Function to display 5 day forecast
function displayFiveDayForecast(data) {
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '';
    data.list
        .filter((item, index) => index % 8 === 0) // gets the forecast for every 24 hours
        .forEach(item => {
            const card = createFiveDayCard(item);
            forecast.appendChild(card);
        });
}

//function to create card for 5 day forecast

function createFiveDayCard(data) {
    const date = new Date(data.dt_txt).toLocaleDateString();
    const temp = data.main.temp;
    const description = data.weather[0].description;

    //create card element
    const fiveDayCard = document.createElement('div');
    fiveDayCard.classList.add('card')

    //create header
    const cardHeader = document.createElement('h4');
    cardHeader.classList.add('card-header');

    card.innerHTML = '';


    return fiveDayCard;
}
 
//function for saving cities to search history
function addToSearchHistory(city) {
    const searchHistory = document.getElementById('search-history');
    const historyItem = document.getElementById('button');
    historyItem.classList.add('list-group-item', 'list-group-item-action');
    historyItem.textContent = city;
    historyItem.addEventListener('click', () => fetchWeatherData(city));
    searchHistory.appendChild(historyItem);
}
