# weatherDashboard

Homework06 - Makoto Asahi

Deployed Link:

https://mrasahi.github.io/weatherDashboard/

# Summary

5 Day Weather Forecast using the [OpenWeather API](https://openweathermap.org/api)

Current time and day is displayed on the header

Header greeting also changes depending on the time hour

The user can search a City in the input box to show the weather forecast.

The most recent forecast is displayed on the big box.

UV Index changes color depending on its intensity.

5 day forecast will always find and take the 3pm time to be consistent.

User search history is logged in localStorage and displayed below the Search.

User search history localStorage will store up to 5 items.

Search history on the page will show the 5 most recent searches.


<img src="./assets/img/preview1.jpg" width = "100%">

<img src="./assets/img/preview2.jpg" width = "100%">

<img src="./assets/img/preview3.jpg" width = "100%">

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
