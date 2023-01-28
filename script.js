let recentCities = [];
console.log(recentCities)

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
    var history = $("#history");
    var recentSearch = $('<h4>').text("Recent searches:").css('margin-top', 10);
    history.append(recentSearch);
    var pastCities = JSON.parse(localStorage.getItem("pastCities"));
    console.log(pastCities)

    // buttons added to page for ever past city searched
    for (let i = 0; i < pastCities.length; i++) {
        var cityButton = $('<button>').text(pastCities[i]).css('width', 290).css('margin-top', 5)
        history.append(cityButton)
    }
}
