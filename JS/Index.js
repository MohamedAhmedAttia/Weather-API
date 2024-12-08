//transfer wind direction from shortcut to actual word
var windDirectionTransfer = {
    "N": "North",
    "NNE": "North-North-East",
    "NE": "North-East",
    "ENE": "East-North-East",
    "E": "East",
    "ESE": "East-South-East",
    "SE": "South-East",
    "SSE": "South-South-East",
    "S": "South",
    "SSW": "South-South-West",
    "SW": "South-West",
    "WSW": "West-South-West",
    "W": "West",
    "WNW": "West-North-West",
    "NW": "North-West",
    "NNW": "North-North-West"
};

// Variables for to catch DOM elements
//day1
var dayName = document.getElementById("dayName");
var Month = document.getElementById("Month");
var city = document.getElementById("city");
var degree = document.getElementById("degree");
var conditionPic = document.getElementById("conditionPic");
var conditionWord = document.getElementById("conditionWord");
var rain = document.getElementById("rain");
var wind = document.getElementById("wind");
var windDir = document.getElementById("windDir");
//=============================================================
//day2
var dayName2 = document.getElementById("dayName2");
var Month2 = document.getElementById("Month2");
var degreeMax2 = document.getElementById("degreeMax2");
var degreeMin2 = document.getElementById("degreeMin2");
var conditionPic2 = document.getElementById("conditionPic2");
var conditionWord2 = document.getElementById("conditionWord2");
var rain2 = document.getElementById("rain2");
var wind2 = document.getElementById("wind2");
//===============================================================
//day3
var dayName3 = document.getElementById("dayName3");
var Month3 = document.getElementById("Month3");
var degreeMax3 = document.getElementById("degreeMax3");
var degreeMin3 = document.getElementById("degreeMin3");
var conditionPic3 = document.getElementById("conditionPic3");
var conditionWord3 = document.getElementById("conditionWord3");
var rain3 = document.getElementById("rain3");
var wind3 = document.getElementById("wind3");
//==============================================================

// Function to format the date to "Day Date Month"
function formatDate(dateString) {
    const date = new Date(dateString); // Convert the date string into a Date object
    const options = { weekday: 'long', day: 'numeric', month: 'long' }; // Format options
    return date.toLocaleDateString('en-GB', options); // Convert to desired format
}

// Async function to fetch and display weather data
async function getWeather(link) {
    var response = await fetch(link);
    var data = await response.json();

    // Access specific data from the API response and show it on DOM
    //day1
    city.innerHTML = data.location.name;
    degree.innerHTML = data.current.temp_c + `<span class="degree fs-1">o</span>C`;
    conditionWord.innerHTML = data.current.condition.text;
    conditionPic.setAttribute('src', "https:" + data.current.condition.icon);
    rain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain ;
    wind.innerHTML = data.current.wind_kph;
    // Convert wind direction abbreviation to full word using the windDirectionTransfer
    windDir.innerHTML = windDirectionTransfer[data.current.wind_dir];
    // Format the date from the API
    var forecastDate = data.forecast.forecastday[0].date; 
    var formattedDate = formatDate(forecastDate);
    // Update the day and month using the formatted date
    var dateParts = formattedDate.split(' '); 
    dayName.innerHTML = dateParts[0]; 
    Month.innerHTML = `<span>${dateParts[1]}</span> ` + dateParts[2];
    //===================================================================================
    //day2
    var forecastDate2 = data.forecast.forecastday[1].date; 
    var formattedDate2 = formatDate(forecastDate2);
    var dateParts2 = formattedDate2.split(' '); 
    Month2.innerHTML = `<span>${dateParts2[1]}</span> ` + dateParts2[2];
    dayName2.innerHTML = dateParts2[0]; 
    degreeMax2.innerHTML = data.forecast.forecastday[1].day.maxtemp_c +`<span class="degree fs-1">o</span>C`;
    degreeMin2.innerHTML=data.forecast.forecastday[1].day.mintemp_c +`<span class="degree fs-6">o</span>C`;
    conditionPic2.setAttribute('src', "https:" + data.forecast.forecastday[1].day.condition.icon);
    conditionWord2.innerHTML = data.forecast.forecastday[1].day.condition.text;
    rain2.innerHTML=data.forecast.forecastday[1].day.daily_chance_of_rain;
    wind2.innerHTML = data.forecast.forecastday[1].day.maxwind_kph;
    var forecastCondition1 = data.forecast.forecastday[0].day.condition.text;
    //============================================================================================
    //day3
    var forecastDate3 = data.forecast.forecastday[2].date; 
    var formattedDate3 = formatDate(forecastDate3);
    var dateParts3 = formattedDate3.split(' '); 
    Month3.innerHTML = `<span>${dateParts3[1]}</span> ` + dateParts3[2];
    dayName3.innerHTML = dateParts3[0]; 
    degreeMax3.innerHTML = data.forecast.forecastday[2].day.maxtemp_c +`<span class="degree fs-1">o</span>C`;
    degreeMin3.innerHTML=data.forecast.forecastday[2].day.mintemp_c +`<span class="degree fs-6">o</span>C`;
    conditionPic3.setAttribute('src', "https:" + data.forecast.forecastday[2].day.condition.icon);
    conditionWord3.innerHTML = data.forecast.forecastday[2].day.condition.text;
    rain3.innerHTML=data.forecast.forecastday[2].day.daily_chance_of_rain;
    wind3.innerHTML = data.forecast.forecastday[2].day.maxwind_kph;
}

getWeather("https://api.weatherapi.com/v1/forecast.json?key=991ba50c10fc4632bf574404240812&q=cairo&days=3");

//a variable to catch input search element
var search =document.getElementById('search')

//to call getWeather using searcForCity each time an input event occurs
search.addEventListener("input", function(){
    searchForCity(search.value)
})
//the function that calls getWeather function
function searchForCity(value){
    getWeather(`https://api.weatherapi.com/v1/forecast.json?key=991ba50c10fc4632bf574404240812&q=${value}&days=3`);

}
