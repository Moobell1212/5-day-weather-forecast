$("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#search-input").val();
    console.log(city);
    $("#search-input").val('');
})