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
    $("#search-input").val('');
    $("#history").empty();
    createPastChoices()
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

}
