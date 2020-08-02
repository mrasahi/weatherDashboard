// Weather api
// https://openweathermap.org/api
// api key
// 204a21677e88c64a7fde4e4dce4f596a


// example
// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=1dd25ac798a84daed3b612ef4b3c9a3e

// Current time with moment
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
$('#currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
// Updates time every 1 sec
setInterval(() => {
    $('#currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'))
}, 1000);



// Search city button
$('#search').click(function () {
    event.preventDefault()
    let city = $('#city').val()
    console.log(city)
    // API request to weather
    $.ajax(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=204a21677e88c64a7fde4e4dce4f596a`)
        .then(result => {
            console.log(result)
            let cityName = result.city.name
            console.log(cityName)
            let forecast = result.list
            $(forecast).each(function () {
                // Check if forecast time has 15:00:00
                if ($(this)[0].dt_txt.indexOf('15:00:00') >= 0) {
                    console.log($(this)[0])
                    console.log($(this)[0].dt_txt)
                    console.log($(this)[0].main.temp)
                    console.log($(this)[0].weather[0].icon)
                    console.log($(this)[0].wind.speed)
                    let weatherDiv = document.createElement('div')
                    weatherDiv.innerHTML = `
                    <h2>${$(this)[0].dt_txt.slice(0, 10)}</h2>
                    <p>${$(this)[0].weather[0].description}</p>
                    <img src="http://openweathermap.org/img/wn/${$(this)[0].weather[0].icon}@2x.png">
                    <p>Temp: ${$(this)[0].main.temp} °F</p>
                    <p>Humidity: ${$(this)[0].main.humidity}</p>
                    <p>Wind Speed: ${$(this)[0].wind.speed}</p>
                    `
                    document.getElementById('testDisplay').append(weatherDiv)
                }
            })




        })
        // If error occurs on weather API
        .catch(doorstuck => {
            console.log(doorstuck)
        })
})

// units imperial for F
// $.ajax(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=204a21677e88c64a7fde4e4dce4f596a`)
//     .then(res => {
//         console.log(res)
//     })


//     // if error occurs console log
//     .catch(err => {
//         console.log(err)
//     })