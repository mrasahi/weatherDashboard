// api key
// 204a21677e88c64a7fde4e4dce4f596a

// UV data + api key
// http://api.openweathermap.org/data/2.5/uvi/forecast?appid=204a21677e88c64a7fde4e4dce4f596a&lat=${lat}&lon=${lon}&cnt={cnt}


// Display current Time
$('#currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
// Updates time every 1 sec
setInterval(() => {
    $('#currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
}, 1000);

// Greeting based on current hour
if (moment().format('HH') >= 17 || (moment().format('HH') < 4)) {
    $('#greeting').text('Good Evening')
} else if (moment().format('HH') < 12) {
    $('#greeting').text('Good Morning')
} else {
    $('#greeting').text('Good Afternoon')
}

// API request to weather
function forecastDisplay(city) {
    $.ajax(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=204a21677e88c64a7fde4e4dce4f596a`)
        .then(result => {
            let forecast = result.list
            console.log(result)
            // Write stuff for currentDay
            $('#currentDay').html(`
        <h1>${result.city.name}</h1>
        <p class="card-title">${moment(forecast[0].dt_txt).format("MMM Do YYYY")}</p>
        <img class="border bg-primary" src="http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png">
        <p>${forecast[0].weather[0].description}</p>
        <p>Temp: ${forecast[0].main.temp} °F</p>
        <p>Humidity: ${forecast[0].main.humidity}%</p>
        <p>Wind Speed: ${forecast[0].wind.speed} mph</p>
        <p id="uvIndex">UV Index: </p>
        `)

            $(forecast).each(function () {
                // Check if forecast time has 15:00:00
                if ($(this)[0].dt_txt.indexOf('15:00:00') >= 0) {
                    let singleDay = document.createElement('div')
                    $(singleDay).addClass("col-md-2 card bg-primary text-center mb-2 mx-2")
                    singleDay.innerHTML = `
                             <h4>${moment($(this)[0].dt_txt).format("MMM Do YYYY")}</h4>
                             <img class="card-img-top" src="http://openweathermap.org/img/wn/${$(this)[0].weather[0].icon}@2x.png">
                             <p>${$(this)[0].weather[0].description}</p>
                             <p>Temp: ${$(this)[0].main.temp} °F</p>
                             <p>Humidity: ${$(this)[0].main.humidity}%</p>
                             <p>Wind Speed: ${$(this)[0].wind.speed} mph</p>
                    `
                    $('#forecast').append(singleDay)
                }
            })
            // UV index API
            let lat = result.city.coord.lat
            let lon = result.city.coord.lon
            $.ajax(`http://api.openweathermap.org/data/2.5/uvi/forecast?appid=204a21677e88c64a7fde4e4dce4f596a&lat=${lat}&lon=${lon}&cnt=1`)
                // Add UV index to currentDay
                .then(uvIndex => {
                    console.log(uvIndex)
                    $('#uvIndex').append($(uvIndex)[0].value)
                    // $('#uvIndex').html('no u')
                    // 0 - 2 "Low" Green
                    // 3 - 5  "Moderate" Yellow
                    // 6 - 7 Orange "High"
                    // 8 - 10 Red "Very High"
                    // 11+ Pink "Extreme"

                    let uvIndexColor = Math.floor(uvIndex[0].value)
                    // UV color change switch
                    switch (uvIndexColor) {
                        case 0:
                        case 1:
                        case 2:
                            console.log('Green')
                            $('#uvIndex').css('background-color', 'green')
                            break;
                        case 3:
                        case 4:
                        case 5:
                            console.log('Yellow')
                            $('#uvIndex').css('background-color', 'yellow')
                            break;
                        case 6:
                        case 7:
                            console.log('Orange')
                            $('#uvIndex').css('background-color', 'orange')
                            break;
                        case 8:
                        case 9:
                        case 10:
                            console.log('Red')
                            $('#uvIndex').css('background-color', 'red')
                            break;
                        case 11:
                            console.log('Pink')
                            $('#uvIndex').css('background-color:', 'pink')
                            break;
                        default:
                            console.log('Pink')
                            $('#uvIndex').css('background-color', 'pink')
                    }
                })

                // if error occurs on UV API
                .catch(uverr => {
                    console.log(uverr)
                })
        })
        // If error occurs on weather API
        .catch(doorstuck => {
            console.log(doorstuck)
        })
}


// Search city button
$('#search').click(function () {
    event.preventDefault()
    let city = $('#city').val()
    console.log(city)
    forecastDisplay(city)

})

// History list
$('.list-group-item').click(function () {
    let city = $(this).text()
    forecastDisplay(city)
})