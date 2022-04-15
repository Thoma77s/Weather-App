var locationInputEl = document.querySelector("#location-input");
var cityFormEl = document.querySelector("#city-form");
var cityContainerEl = document.querySelector(".city-container");
var savedLocationsEl = document.querySelector(".saved-locations");
var weekContainerEl = document.querySelector(".week-container");



var getWeather = function(city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dc2556c07508f18009a5420cc2296743";
  
  //make a request to the urlT
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(city) {
       var responseLat = city.coord.lat;
       var responseLon = city.coord.lon;
       var coordinates = responseLat,responseLon;
      console.log(responseLat);
      console.log(responseLon);
      var apiUrlCoordinates = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon="+ city.coord.lon + "&limit=5&appid=dc2556c07508f18009a5420cc2296743";
        fetch(apiUrlCoordinates).then(function(response) {
          if (response.ok) {
          response.json().then(function(city) {
      
          });
        }else {
          window.alert("Error: City Not Found");
        }
        })
        .catch(function(error) {
          alert("Unable to connect to Database");
        });
      //getDayWeather(city);
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

  var getUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=dc2556c07508f18009a5420cc2296743";
  fetch(getUrlFiveDay).then(function(response) {
    if (response.ok) {
    response.json().then(function(city) {
      // var responseLat = city.coord.lat;
      // var responseLon = city.coord.lon;
      // var coordinates = responseLat,responseLon;
      console.log(city)
      var apiUrlCoordinates = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon="+ city.coord.lon + "&limit=5&appid=dc2556c07508f18009a5420cc2296743";
        fetch(apiUrlCoordinates).then(function(response) {
          if (response.ok) {
          response.json().then(function(city) {
      
          });
        }else {
          window.alert("Error: City Not Found");
        }
        })
        .catch(function(error) {
          alert("Unable to connect to Database");
        });
      //getDayWeather(city);
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
    //citiesContainer.innerHTML = "";
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
     createDayCards(city)
    
  };

   function createCityCards(city) { 
    const citiesContainer = document.getElementById('city-container');
     // Select the card-template in the DOM
     const cardTemplate = document.getElementById('card-template');
     console.log(city.main.temp);
       // Create a cardTemplate element in javascript to start populating data
       const card = document.importNode(cardTemplate.content, true);
       card.querySelector('.city-name').textContent = city.name;
       card.querySelector('.city-temp').textContent = "Temp: " + (((city.main.temp-273.15)*1.8)+32).toFixed(2);;
       card.querySelector('.city-wind').textContent = "Wind: " + city.wind.speed + " MPH";
       card.querySelector('.city-humidity').textContent = "Humidity: " + city.main.humidity + " %";
       //card.querySelector('.city-uvi').textContent = "UV-Index: " + city.coord.lat,city.coord.lon.current.uvi
       citiesContainer.appendChild(card);
   };

   function createDayCards(city) { 
    const citiesContainer = document.getElementById('week-container');
     // Select the card-template in the DOM
     const cardTemplate = document.getElementById('day-card-template');
     for(i=0; i < 6; i++) {
       // Create a cardTemplate element in javascript to start populating data
       const card = document.importNode(cardTemplate.content, true);
       console.log(city.list);
       card.querySelector('.day-of-the-week').textContent = city.name;
       card.querySelector('.day-city-temp').textContent = "Feels like: " + (((city.main.feels_like.day-273.15)*1.8)+32).toFixed(2);
       card.querySelector('.day-city-wind').textContent = "Wind: " + city.wind.speed + " MPH";
       card.querySelector('.day-city-humidity').textContent = "Humidity: " + city.main.humidity + " %";
       citiesContainer.appendChild(card);
  };
}


cityFormEl.addEventListener("submit", formSubmitHandler);