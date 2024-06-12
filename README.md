# Weather-Dashboard

## Description
This application functions as a weather dashboard that uses a 5 day weather forecast API to retrieve weather data for cities. For the user story, as a traveler, I want to see the weather outlook for multiple cities so that I can plan a trip accordingly. 

While completing this application, I learned how to utilize an API to retrieve data, how to access specific parts of that data and display them in my application and how to create search history that will populate to the webpage. I practiced using the CSS framework Bootstrap for styling and overall layout, using fetch to request data from the API, creating and styling cards with multiple elements using JavaScript and utilizing local storage to store data. Some challenges that I faced were getting the fetch function to access the correct information, getting the local storage functions to work properly and figuring out how to convert the units from celcius to farenheit for the temperature. 

## Installation
No installation steps are required for this project as it is a web-based application that runs in the browser.

## Usage
Upon loading this application, you will see a text box in the upper left corner that prompts the user to enter a city name. After you enter your desired city, select the submit button. You will now see that there is a box that displays current weather conditions for that city with the city name, date, an icon representation of the weather conditions, the temperature, wind speed and humidity. The temperature should be displayed in Farenheit and wind speed should be displayed in MPH. Beneath this box, you will see 5 different dark blue cards that represent the 5 day forecast for your selected city. These cards display the same information listed above, minus the city name. On the left hand side of the page, you will notice that your recent city searches are saved. You can select any of these saved cities to see the current and future weather conditions of that city displayed once more. Finally, your search history for saved cities will persist on the page upon refresh and in local storage. 

Please click [here]() for the deployed application.

![alt text](screenshot of application)

## Credits
* JavaScript
* OpenWeather API
* Bootstrap

## License
N/A
