let recentCities = [];
// console.log(recentCities)

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // cityinput value
    var city = $("#search-input").val();
    // push cityinput to the array
    recentCities.push(city);
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
        var cityButton = $('<button>').text(pastCities[i]).css('width', 290).css('margin-top', 5).css('border-radius', 7);
        $("#history").append(cityButton)
    }
}

function getWeather() {
    var APIKey = "39aa227f0467d72e549c51c77a84fa68";
    var city = $("#search-input").val();
    var geoInfo = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;
    $.ajax({
        url: geoInfo,
        method: "GET"
    })
        .then(function (response) {
            console.log(response)
            var cityLat = response[0].lat;
            // console.log(cityLat)
            var cityLong = response[0].lon;
            // console.log(cityLong)
            // console.log(cityLat);
            // console.log(cityLong);
            var queryURL = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + cityLat + "&lon=" + cityLong + "&limit=5&appid=" + APIKey;
            // console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    $('#today').addClass("border border-dark rounded")




                    // put onto page
                    var date = moment().format("DD/MM/YYYY");
                    $('#today').append($('<h1>').text(city + ": " + date))
                    // The date
                    // An icon representation of weather conditions
                    // The temperature
                    // The humidity
                    // The wind speed
                    

                    // add city name

                })
        })
        
}
