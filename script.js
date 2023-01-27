var recentCities = [];

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#search-input").val();
    recentCities.push(city);
    console.log(city);
    recentSearches();
    $("#search-input").val('');
})

function recentSearches() {
    console.log(recentCities)
}