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
    getWeather();
    $("#search-input").val('');
    $("#today").empty();
})

// function for adding past searched cities
function createPastChoices() {
    // add the title "Recent searches" under the search section
    $("#history").append($('<h4>').text("Recent searches:").css('margin-top', 10));
    // gets the array of past searched cities from local storage
    var pastCities = JSON.parse(localStorage.getItem("pastCities"));
    // buttons added to page for every past city searched
    for (let i = 0; i < pastCities.length; i++) {
        var cityButton = $('<button>').text(pastCities[i]).css('width', '15em').css('margin-top', 5).css('border-radius', 7).css('height', 40);
        $("#history").append(cityButton)
    }
}

function getWeather() {
    var city = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=39aa227f0467d72e549c51c77a84fa68";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(response);
            $('#today').addClass("border border-dark rounded");
            // get the current date
            var date = moment().format("DD/MM/YYYY");
            // get the current weather icon
            var iconID = response.list[0].weather[0].icon;
            var icon = $('<img>');
            icon.attr("src", "https://openweathermap.org/img/wn/" + iconID + ".png");
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
                // console.log(targetTimes);
                if (targetTimes === "12:00:00") {
                    forecastArray.push(response.list[i]);
                }
                // console.log(forecastArray);
            }
            $("#forecast-title").append($('<h2>').text("5-day forecast:"));
            forecastArray.forEach(forecast => {
                console.log(forecast) ;
                var dates = moment.unix(forecast.dt).format("DD/MM/YYYY");
                // add forecast card
                var card = $('<div>').addClass("card").css("min-width", 150);
                var cardTitle = $('<h4>').addClass("card-title text-center").text(dates);
                cardTitle.append();
                $("#forecast").append(card.append(cardTitle));
            })
            // // The date
            // An icon representation of weather conditions
            // The temperature
            // Wind speed
            // The humidity
        })
}

