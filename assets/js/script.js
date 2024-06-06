// Define variable relating to button element
const submitButton = document.getElementById('submitButton');

// Event listener to handle search request
submitButton.addEventListener('click', getApiInfo);

// Function to handle API request
function getApiInfo() {
    // Get the city input value
    const cityInput = document.getElementById('city-input').value;
    const apiKey = "aa86764387e724a2ce905596583a423b";

    // Fetch request to fetch weather data from weather API based on the user input city name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const coordinates = {
            latitude: data.coord.lat,
            longitude: data.coord.lon
        };
        console.log("Geographical coordinates:", coordinates);
        // Process the received data here
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

//function to create card for 5 day forecast

function createFiveDayCard(fiveDayForecastData) {

    //create card element
    const fiveDayCard = document.createElement('div');
    fiveDayCard.classList.add('card')

    //create header
    const cardHeader = document.createElement('h4');
    cardHeader.classList.add('card-header');

}


