"use strict";
let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('pagecontent');

// Get the Json file
let weatherURL = "/weather/javascript/weather.json";
fetchData(weatherURL);

// The data we want from the weather.json file
function fetchData(weatherURL) {
  let cityName = 'Greenville'; 
  fetch(weatherURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Network response was not OK.');
    })
    .then(function (data) {
      // Check the data object that was retrieved
      console.log(data);
      // data is the full JavaScript object, but we only want the greenville part
      // shorten the variable and focus only on the data we want to reduce typing
      let g = data[cityName];

      // ************ Get the content ******************************

      // Get the location data
      let locName = g.City;
      let locState = g.State;
      // Put them together
      let fullName = locName + ', ' + locState;
      // See if it worked
      console.log('fullName is: ' + fullName);

      // Get the temperature data
      let curTemp = g.Temp;
      let high = g.High;
      let low = g.Low;
      //See if it worked
      console.log("Current Temp: " + curTemp + ", High: " + high + ", Low: " + low);

      // Get the wind data 
      let wind = g.Wind;
      let direction = g.Direction;
      let windgusts = g.Gusts;
      //See if it worked
      console.log("Wind speed: " + wind + ", Direction of wind: " + direction + ", Speed of gusts: " + windgusts);

      // Get the current conditions
      let summary = g.Summary;
      let precip = g.Precip;
      //See if it worked 
      console.log("Condition is: " + summary + ", Precipitation: " + precip);

      // Get the hourly data 
      let hourlyData = g.Hourly;
      //See if it worked
      console.log("Hourly data: " + hourlyData);

      // ************ Display the content ******************************
      // Set the title with the location name at the first
      // Gets the title element so it can be worked with
      let pagetitle = document.getElementById('pagetitle');
      // Create a text node containing the full name 
      let fullNameNode = document.createTextNode(fullName);
      // inserts the fullName value before any other content that might exist
      pagetitle.insertBefore(fullNameNode, pagetitle.childNodes[0]);
      // When this is done the title should look something like this:
      // Greenville, SC | The Weather Site

      // Set the Location information
      let convertedElevation = convertMeters(g.Elevation);
      console.log("Elevation converted into feet equals " + convertedElevation);
      document.getElementById("elevation").innerHTML = convertedElevation;
      // Get the h1 to display the city location
      let pagecontent = document.getElementById('locName');
      pagecontent.innerHTML = fullName;
      // The h1 in main h1 should now say "Greenville, SC"


      // Set the temperature information
      document.getElementById("current").innerHTML = curTemp + "&deg; F";
      document.getElementById("hot").innerHTML = high + "&deg; F";
      document.getElementById("cold").innerHTML = low + "&deg; F";
      document.getElementById("feelTemp").innerHTML = buildWC(wind, curTemp);


      // Set the wind information
      document.getElementById("windspeed").innerHTML = wind + " mph";
      document.getElementById("windgusts").innerHTML = windgusts + " mph";
      document.getElementById("direction").innerHTML = direction;
      windDial(direction);

      // Set the current conditions information
      document.getElementById("weathertitle").innerHTML = summary;
      //document.getElementById("precip").innerHTML = precip;
      let weather = document.getElementById("weathertitle").innerHTML;
      changeSummaryImage(weather);

      // Set the hourly temperature information
      let date = new Date();
      let nextHour = date.getHours() + 1;
      // Call hourly information from JSon and format using functions
      let hourlyUL = document.getElementById("scroll");
      hourlyUL.innerHTML = buildHourlyData(nextHour, hourlyData);

      // Change the status of the containers
      contentContainer.setAttribute('class', ''); // removes the hide class
      statusContainer.setAttribute('class', 'hide'); // hides the status container
    })
    .catch(function (error) {
      console.log('There was a fetch problem: ', error.message);
      statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
}