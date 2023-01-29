let recentCities = [];
// console.log(recentCities)

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // cityinput value
    var city = $("#search-input").val();
    // push cityinput to the array only if it is not already there
    if (recentCities.indexOf(city) === -1){
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
        var cityButton = $('<button>').text(pastCities[i]).css('width', 290).css('margin-top', 5).css('border-radius', 7);
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
            // put onto page the date
            var date = moment().format("DD/MM/YYYY");
            $('#today').append($('<h1>').text(city + ": " + date))
            // An icon representation of weather conditions
            // The temperature
            var temp = response.list[0].main.temp - 273.15;
            console.log(temp)
            $('#today').append($('<h4>').text("Temperature: " + temp.toFixed() + "°C"))
            // The humidity
            // The wind speed


            // add city name

        })
}
        
