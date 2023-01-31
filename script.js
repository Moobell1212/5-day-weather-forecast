let recentCities = [];

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // cityinput value
    var city = $("#search-input").val();
    // push cityinput to the array only if it is not already there
    if (recentCities.indexOf(city) === -1) {
        recentCities.push(city);
    }
    // add new recentCities array to local storage
    localStorage.setItem("pastCities", JSON.stringify(recentCities));
    // clear the searchbar
    $("#history").empty();
    createPastChoices();
    getWeather(city);
    $("#search-input").val('');
    $("#today").empty();
    $('#forecast-title').empty();
    $('#forecast').empty();
})

// function for adding past searched cities
function createPastChoices() {
    // add the title "Recent searches" under the search section
    $("#history").append($('<h4>').text("Recent searches:").css('margin-top', 10));
    // gets the array of past searched cities from local storage
    var pastCities = JSON.parse(localStorage.getItem("pastCities"));
    // buttons added to page for every past city searched
    for (let i = 0; i < pastCities.length; i++) {
        var cityButton = $('<button>').text(pastCities[i]).attr('id', pastCities[i]).addClass("btn-info cities").css({ 'width': '100%', 'margin-top': 5, 'border-radius': 7, 'height': 40 });
        $("#history").append(cityButton);
        cityButton.on("click", function () {
            var buttonCity = this.id;
            getWeather(buttonCity);
            $("#today").empty();
            $('#forecast-title').empty();
            $('#forecast').empty();
        })
    }
}

function getWeather(thisSearch) {
    var city = thisSearch;
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=39aa227f0467d72e549c51c77a84fa68";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            $('#today').addClass("border border-dark rounded").css("padding", 20);
            // get the current date
            var date = moment().format("DD/MM/YYYY");
            // get the current weather icon
            var iconID = response.list[0].weather[0].icon;
            var icon = $('<img>').attr("src", "https://openweathermap.org/img/wn/" + iconID + ".png").css({ "height": 60, "width": 60 });
            // add city name and date
            var cityH1 = $('<h1>').text(city + " (" + date + ") ");
            $('#today').append(cityH1.append(icon));
            // add the current temperature
            $('#today').append($('<h4>').text("Temperature: " + (response.list[0].main.temp - 273.15).toFixed() + "°C"));
            $('#today').append($('<h4>').text("Feels like: " + (response.list[0].main["feels_like"] - 273.15).toFixed() + "°C"));
            // add the current humidity
            $('#today').append($('<h4>').text("Humidity: " + response.list[0].main.humidity + "%"));
            // add the current wind speed
            $('#today').append($('<h4>').text("Wind speed: " + response.list[0].wind.speed + " KPH"));
            // 5 DAY FORECAST
            var forecastArray = [];
            // create an array of data at 12:00 for each day
            for (let i = 0; i < response.list.length; i++) {
                var targetTimes = response.list[i].dt_txt.split(" ").pop();
                if (targetTimes === "15:00:00") {
                    // account for time zone difference in forecast
                    var countryTimeZone = response.city.timezone;
                    var timeOffset = countryTimeZone / 3600;
                    var arrayTimeOffset = (timeOffset / 3).toFixed();
                    var targetArray = [i] - arrayTimeOffset;
                    forecastArray.push(response.list[targetArray]);
                }
                // console.log(forecastArray);
            }
            $("#forecast-title").append($('<h2>').text("5-day forecast:"));
            forecastArray.forEach(forecast => {
                // console.log(forecast);
                // forecast card dates
                var dates = moment.unix(forecast.dt).format("DD/MM/YYYY");
                // add forecast card
                var card = $('<div>').addClass("card mb-3 p-2 text-white bg-info");
                // card dates 
                var cardDates = $('<h4>').addClass("card-title").text(dates);
                // forecast icons 
                var cardIconID = forecast.weather[0].icon;
                var icon = $('<img>').attr("src", "https://openweathermap.org/img/wn/" + cardIconID + ".png").css({ "height": 50, "width": 50 });
                // forecast temperature
                var cardTemp = $('<h6>').text("Temperature: " + (forecast.main.temp  - 273.15).toFixed() + "°C");
                // forecast wind speed
                var cardWind = $('<h6>').text("Wind Speed: " + forecast.wind.speed + " KPH");
                // forecast humidity
                var cardHumidity = $('<h6>').text("Humidity: " + forecast.main.humidity + "%");
                // build card
                $("#forecast").append(card.append(cardDates, icon, cardTemp, cardWind, cardHumidity));
            })
        })
}

