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

function createPastChoices() {
    var history = $("#history");
    var recentSearch = $('<h4>').text("Recent searches:");
    history.append(recentSearch);
    var pastCities = JSON.parse(localStorage.getItem("pastCities"));
    console.log(pastCities)
    for (let i = 0; i < pastCities.length; i++) {
        var cityButton = $('<button>').text(pastCities[i])
        history.append(cityButton)
    }
}

//  // loop to make buttons for recently searched cities
//  for (let i=0 ; i<recentCities.length; i++) {
//     localStorage.setItem()
//     var cityButton = $('<button>').text(recentCities[i]);
//     history.append(cityButton)
//     }