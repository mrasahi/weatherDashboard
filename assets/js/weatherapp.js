// Weather api
// https://openweathermap.org/api
// api key
// 204a21677e88c64a7fde4e4dce4f596a


// example
// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1dd25ac798a84daed3b612ef4b3c9a3e

// UV data + api key
// http://api.openweathermap.org/data/2.5/uvi/forecast?appid=204a21677e88c64a7fde4e4dce4f596a&lat=${lat}&lon=${lon}&cnt={cnt}


// Current time with moment
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
$('#currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
// Updates time every 1 sec
setInterval(() => {
    $('#currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
}, 1000);


// API request to weather
function forecastDisplay(city) {
    $.ajax(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=204a21677e88c64a7fde4e4dce4f596a`)
    .then(result => {
        let forecast = result.list
        console.log(result)
        // Write stuff for currentDay
        $('#')


        $(forecast).each(function () {
            // Check if forecast time has 15:00:00
            if ($(this)[0].dt_txt.indexOf('15:00:00') >= 0) {
                // console.log($(this)[0])
                // console.log($(this)[0].dt_txt)
                // console.log($(this)[0].main.temp)
                // console.log($(this)[0].weather[0].icon)
                // console.log($(this)[0].wind.speed)
                let weatherDiv = document.createElement('div')
                weatherDiv.classList = 'col-md-2 card bg-primary text-white text-center mb-1 mx-1'
                weatherDiv.innerHTML = `
                <p class="card-title">${moment($(this)[0].dt_txt).format("MMM Do YY")}</p>
                <img class="card-img-top" src="http://openweathermap.org/img/wn/${$(this)[0].weather[0].icon}@2x.png">
                <div class="card-body">
                    <p>${$(this)[0].weather[0].description}</p>
                    <p>Temp: ${$(this)[0].main.temp} °F</p>
                    <p>Humidity: ${$(this)[0].main.humidity}%</p>
                    <p>Wind Speed: ${$(this)[0].wind.speed} mph</p>
                </div>
                `
                document.getElementById('forecast').append(weatherDiv)
            }
        })
        // UV index API
        let lat = result.city.coord.lat
        let lon = result.city.coord.lon
        // console.log(lat)
        // console.log(lon)
        $.ajax(`http://api.openweathermap.org/data/2.5/uvi/forecast?appid=204a21677e88c64a7fde4e4dce4f596a&lat=${lat}&lon=${lon}&cnt=1`)
            .then(uvIndex => {
                // Add UV index to currentDay
                console.log(uvIndex)
                // $('#uvIndex').html('no u')
            })

            // if error occurs on UV API
            .catch(doorstuck => {
                console.log(doorstuck)
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
$('.list-group-item').click(function() {
    let city = $(this).text()
    forecastDisplay(city)
})