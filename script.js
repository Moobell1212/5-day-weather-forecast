let recentCities = [];
// console.log(recentCities)

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
    // console.log(pastCities);
    // buttons added to page for every past city searched
    for (let i = 0; i < pastCities.length; i++) {
        var cityButton = $('<button>').text(pastCities[i]).css('width', 290).css('margin-top', 5).css('border-radius', 7).css('height', 40);
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
            console.log(response);
            $('#today').addClass("border border-dark rounded");
            // get the current date
            var date = moment().format("DD/MM/YYYY");
            // get the current weather icon
            var iconID = response.list[0].weather[0].icon;
            var icon = $('<img>')
            icon.src = "http://openweathermap.org/img/wn/" + iconID + ".png"
            $('#today').append($('<h1>').text(city + ": " + date + icon));
            // $('#today').append($('<h1>').text(city + ": " + date));
            // add the current temperature
            $('#today').append($('<h4>').text("Temperature: " + (response.list[0].main.temp - 273.15).toFixed() + "°C"));
            // add the current humidity
            $('#today').append($('<h4>').text("Humidity: " + response.list[0].main.humidity + "%"));
            // The wind speed


            // add city name

        })
}

