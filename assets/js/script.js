var locationInputEl = document.querySelector("#location-input");
var cityFormEl = document.querySelector("#city-form");
var cityContainerEl = document.querySelector(".city-container")
var savedLocationsEl = document.querySelector(".saved-locations")

var getWeather = function(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dbbeec1bf54bcb81d72b38e62ca7b85d";
  
  //make a request to the urlT
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(city) {
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
    const citiesContainer = document.getElementById('cities-container');
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
    // check if api returned any breweries
    if (city.length === 0) {
      breweryContainerEl.textContent = 'No breweries found.';
      return;
    }  
    createCityCards(city);
  };

  function createCityCards(cities) { 
    const citiesContainer = document.getElementById('cities-container');
    // Select the card-template in the DOM
    const cardTemplate = document.getElementById('card-template');
    cities.forEach((city) => {
      // Create a cardTemplate element in javascript to start populating data
      const card = document.importNode(cardTemplate.content, true);
      card.querySelector('.card-name').textContent = city.name;
      card.querySelector('.card-breweryType').textContent = city.brewery_type;
      card.querySelector('.address-street').textContent = city.street;
      card.querySelector('.address-city').textContent = city.city;
      card.querySelector('.address-state').textContent = city.state;
      card.querySelector('.address-postal').textContent = city.postal;
      card.querySelector('.card-phone').textContent = city.phone;
      card.querySelector('.card-website-url').textContent = city.website_url;
      card.querySelector('.card-website-url').setAttribute("href", city.website_url);
      citiesContainer.appendChild(card);
    });
  };

  cityFormEl.addEventListener("submit", formSubmitHandler);