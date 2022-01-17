var locationInputEl = document.querySelector("#location-input");
var cityFormEl = document.querySelector("#city-form");
var cityContainerEl = document.querySelector(".city-container")
var savedLocationsEl = document.querySelector(".saved-locations")


var getWeather = function(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dc2556c07508f18009a5420cc2296743";
  
  //make a request to the urlT
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(city) {
      console.log(city);
      displayWeather(city);
    });
  }else {
    window.alert("Error: City Not Found");
  }
  })
  .catch(function(error) {
    alert("Unable to connect to Database");
  });
  }

  var formSubmitHandler = function(event) {
    const citiesContainer = document.getElementById('city-container');
    citiesContainer.innerHTML = "";
    event.preventDefault();
    var city = locationInputEl.value.trim();
  
    if (city) {
      getWeather(city);
      locationInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
    console.log(event);
  }

  var displayWeather = function(city) {
    // check if api returned anything
    if (city.length === 0) {
      cityContainerEl.textContent = 'City Not Found.';
      return;
    }  
     createCityCards(city);
  };

   function createCityCards(city) { 
    const citiesContainer = document.getElementById('city-container');
     // Select the card-template in the DOM
     const cardTemplate = document.getElementById('card-template');
     city.forEach((city) => {
       // Create a cardTemplate element in javascript to start populating data
       const card = document.importNode(cardTemplate.content, true);
       card.querySelector('.city-name').textContent = city.name;
       card.querySelector('.city-temp').textContent = city.temp;
       card.querySelector('.city-wind').textContent = city.wind;
       card.querySelector('.city-humidity').textContent = city.humidity;
       citiesContainer.appendChild(card);
     });
   };

  cityFormEl.addEventListener("submit", formSubmitHandler);