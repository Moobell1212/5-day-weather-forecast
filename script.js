let recentCities = [];
console.log(recentCities)

$("#search-button").on("click", function (event) {
    event.preventDefault();
    // cityinput value
    var city = $("#search-input").val();

    // push cityinput to the array
    recentCities.push(city);

    // add new recentCities array to local storage
    localStorage.setItem("Past cities", recentCities);

    // clear the searchbar
    $("#search-input").val('');

    $("#history").empty();

    createPastChoices()
})

function createPastChoices() {
    var history = $("#history");
    var recentSearch = $('<h4>').text("Recent searches:");
    history.append(recentSearch);
    localStorage.names = JSON.stringify(names);
    var storedNames = JSON.parse(localStorage.names);
    console.log(storedNames)
}

//  // loop to make buttons for recently searched cities
//  for (let i=0 ; i<recentCities.length; i++) {
//     localStorage.setItem()
//     var cityButton = $('<button>').text(recentCities[i]);
//     history.append(cityButton)
//     }