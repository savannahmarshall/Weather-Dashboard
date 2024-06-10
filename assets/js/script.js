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
    const currentWeather = document.getElementById('current-weather');
    currentWeather.innerHTML = '';

    //create card element
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('card', 'mb-3', 'border-dark');
    weatherCard.style.borderWidth = '2px';

    //create card body 
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    //create and add elements to the card body
    const cityName = document.createElement('h4');
    cityName.classList.add('card-title');
    cityName.textContent = data.name;

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    const temperatureElement = document.createElement('p');
    temperatureElement.classList.add('card-text');
    const tempFahrenheit = (data.main.temp * 9 / 5) + 32; // Convert temperature to Fahrenheit
    temperatureElement.textContent = `Temperature: ${tempFahrenheit.toFixed(2)}°F`;

    const humidityElement = document.createElement('p');
    humidityElement.classList.add('card-text');
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

    const windElement = document.createElement('p');
    windElement.classList.add('card-text');
    const windMPH = data.wind.speed * 3600 / 1609.344; // Convert wind speed to MPH
    windElement.textContent = `Wind Speed: ${windMPH.toFixed(2)} mph`;

    //append the card elements to the card body
    cardBody.appendChild(cityName);
    cardBody.appendChild(weatherIcon);
    cardBody.appendChild(temperatureElement);
    cardBody.appendChild(windElement);
    cardBody.appendChild(humidityElement);
   

    //Append card body to the card
    weatherCard.appendChild(cardBody);

    //Append the card  to the current weather container
    currentWeather.appendChild(weatherCard);

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

    // Create a container for the forecast
    const forecastContainer = document.createElement('div');

    // Create a title for the forecast
    const title = document.createElement('h2');
    title.textContent = '5 Day Forecast:';
    title.classList.add('mb-3');
    forecastContainer.appendChild(title);

    // Create a flex container for the cards
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('d-flex', 'flex-wrap'); // Bootstrap classes for flex and wrapping

    // Iterate through the forecast data and create cards
    data.list
        .filter((item, index) => index % 8 === 0) // gets the forecast for every 24 hours
        .forEach(item => {
            const card = createFiveDayCard(item);
            cardsContainer.appendChild(card);
        });

    // Append the cards container to the forecast container
    forecastContainer.appendChild(cardsContainer);

    // Append the forecast container to the forecast section
    forecast.appendChild(forecastContainer);
}

//function to create card for 5 day forecast

function createFiveDayCard(data) {
    const date = new Date(data.dt_txt).toLocaleDateString();
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon; 

    // Create card element
    const fiveDayCard = document.createElement('div');
    fiveDayCard.classList.add('card', 'dark-blue-bg', 'mx-2');

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const weatherIcon = document.createElement('img');
    weatherIcon.src =`https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = description;

    // Create elements for card body
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = date;

    const temperatureElement = document.createElement('p');
    temperatureElement.classList.add('card-text');
    const tempFahrenheit = (temp * 9 / 5) + 32; // Convert temperature to Fahrenheit
    temperatureElement.textContent = `Temp: ${tempFahrenheit.toFixed(2)}°F`;

    const humidityElement = document.createElement('p');
    humidityElement.classList.add('card-text');
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const windElement = document.createElement('p');
    windElement.classList.add('card-text');
    const windMPH = data.wind.speed * 3600 / 1609.344; // Convert wind speed to MPH
    windElement.textContent = `Wind: ${windMPH.toFixed(2)} MPH`;

    // Append elements to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(weatherIcon);
    cardBody.appendChild(temperatureElement);
    cardBody.appendChild(windElement);
    cardBody.appendChild(humidityElement);
   

    // Append card body to the card
    fiveDayCard.appendChild(cardBody);

    return fiveDayCard;
}
 
//function for saving cities to search history
function saveToSearchHistory(city) {
    const searchHistory = document.getElementById('search-history');
    const historyItem = document.getElementById('button');
    historyItem.classList.add('list-group-item', 'list-group-item-action');
    historyItem.textContent = city;
    historyItem.addEventListener('click', () => fetchWeatherData(city));
    searchHistory.appendChild(historyItem);
}
