/************************************
 * Weather Site Javascript Functions
 ************************************/

console.log('My javascript is being read');

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
        "user-agent": "Student Learning Project - wel15032@byui.edu"
    }
};


// Setup localStorage
var storage = window.localStorage;

// Variables for Function use
const temp = 31;
const speed = 5;
buildWC(speed, temp);

// Wind dial call function
const direction = "ne"; //set your own value
windDial(direction);

// Meters function
let meters = 1400;

console.log("Meters: " + meters);
let feet = convertMeters(meters);
console.log("Feet: " + feet);
setElevation(feet);

//Current conditions function
const condition = getCondition('Rain');
changeSummaryImage(condition);

//  This is to calculate the wind chill
function buildWC(speed, temp) {

    const feelTemp = document.getElementById("feelTemp")

    // Compute wind chill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the wind chill
    console.log(wc);

    // wc = 'Feels like '+wc+'&deg;F';
    feelTemp.innerHTML = wc;
    return wc;
}

// Wind dial function
function windDial(direction) {


    // Get wind dial container
    const dial = document.getElementById("dial");
    console.log(direction);

    // make sure string is all uppercase
    direction = direction.toUpperCase();


    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}

// Convert meters
//this function will take meters and convert it to feet
function convertMeters(meters) {
    let feet = meters * 3.2804;
    feet = Math.round(feet);
    return feet;
}

// The number that we are going to get from the function with change the elevation
// on the page to feet.
function setElevation(feet) {
    document.getElementById('elevation').innerHTML = feet;
}


//Function that will change the image based on current conditions
function getCondition(statement) {
    statement = statement.toLowerCase();
    console.log("statement passed to getCondition() is: " + statement);
    let condition = "";


    if (statement == 'cloudy' ||
        statement == 'overcast' ||
        statement == 'gloomy') {
        condition = 'clouds';
        return condition;
    } else if (statement == 'snow' ||
        statement == 'snowing' ||
        statement == 'flurries') {
        condition = 'snow';
        return condition;
    } else if (statement == 'fog' ||
        statement == 'foggy' ||
        statement == 'low visibility') {
        condition = 'fog';
        return condition;

    } else if (statement == 'raining' ||
        statement == 'rain' ||
        statement == 'pouring' ||
        statement == 'precipitation' ||
        statement == 'wet') {
        condition = 'rain';
        return condition;
    } else {
        condition = 'clear'
        return condition;
    }
}

function changeSummaryImage(weather) {
    const weatherImages = weather;
    let backgroundImage = document.getElementById("background-section");
    switch (weather) {
        case "clouds":
            weather_c.setAttribute("class", "clouds");
            curWeather.setAttribute("class", "clouds");
            document.getElementById("weathertitle").innerText = "Clouds";
            backgroundImage.setAttribute("class", "clouds");
            break;
        case "rain":
            weather_c.setAttribute("class", "rain");
            curWeather.setAttribute("class", "rain");
            document.getElementById("weathertitle").innerText = "Rain";
            backgroundImage.setAttribute("class", "rain");
            break;
        case "clear":
            weather_c.setAttribute("class", "clear");
            curWeather.setAttribute("class", "clear");
            document.getElementById("weathertitle").innerText = "Clear";
            break;
        case "snow":
            weather_c.setAttribute("class", "snow");
            curWeather.setAttribute("class", "snow");
            document.getElementById("weathertitle").innerText = "Snow";
            break;
        case "fog":
            weather_c.setAttribute("class", "fog");
            curWeather.setAttribute("class", "fog");
            document.getElementById("weathertitle").innerText = "Fog";
            break;

    }
}



// Convert, Format time to 12 hour format
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}


// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}


// Get the next hour based on the current time
let date = new Date();
let nextHour = date.getHours() + 1;

// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale;
    // NWS User-Agent header (built above) will be the second parameter 
    console.log(idHeader);
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            console.log('Json object getLocation function:');
            console.log(data);
            // Store data to localstorage 
            storage.setItem("locName", data.properties.relativeLocation.properties.city);
            storage.setItem("locState", data.properties.relativeLocation.properties.state);

            //Link to hourly data
            let hourlyLink = data.properties.forecastHourly;
            console.log(hourlyLink)
            getHourly(hourlyLink);

            //Forcast Info
            let forecastURL = data.properties.forecast;
            console.log('did forcast url work?', forecastURL);
            getForecast(forecastURL);

            // Next, get the weather station ID before requesting current conditions 
            // URL for station list is in the data object 
            let stationsURL = data.properties.observationStations;
            // Call the function to get the list of weather stations
            getStationId(stationsURL);
        })
        .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getStationId function:');
            console.log(data);

            // Store station ID and elevation (in meters - will need to be converted to feet) 
            let stationId = data.features[0].properties.stationIdentifier;
            let stationElevation = data.features[0].properties.elevation.value;
            console.log('Station and Elevation are: ' + stationId, stationElevation);

            // Store data to localstorage 
            storage.setItem("stationId", stationId);
            storage.setItem("stationElevation", stationElevation);

            // Request the Current Weather for this station 
            getWeather(stationId);
        })
        .catch(error => console.log('There was a getStationId error: ', error))
} // end getStationId function

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) {
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            console.log('From getWeather function:');
            console.log(data);


        })
        .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function

//start getHourly function
function getHourly(hourlyLink) {
    fetch(hourlyLink)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new error('Response not Ok.')
        })
        .then(function (data) {
            //check
            console.log('json object from getHourly function');
            console.log(data);
            //get Hourly info
            let hourly = [];
            for (let i = 0; i < 13; i++) {
                hourly[i] = data.properties.periods[i].temperature;
            }
            // Get information
            let windDirection = data.properties.periods[0].windDirection;
            let windSpeed = data.properties.periods[0].windSpeed;
            let temperature = data.properties.periods[0].temperature;

            // move to Local Storage
            storage.setItem("hourly", hourly);
            storage.setItem("windDirection", windDirection);
            storage.setItem("windSpeed", windSpeed);
            storage.setItem("temperature", temperature);
        })
        .catch(error => console.log("There was a getHourly error: ", error))
}
//End getHourly Function

// getForcast function
function getForecast(forecastURL) {
    fetch(forecastURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Response not OK.");
        })
        .then(function (data) {
            // Check 
            console.log("Object from getForecast function: ");
            console.log(data);

            // Store Forecast information
            let high = data.properties.periods[0].temperature;
            let low = data.properties.periods[1].temperature;
            let icon = data.properties.periods[0].icon;
            let detailedForecast = data.properties.periods[0].detailedForecast;

            // Local storage
            storage.setItem("high", high);
            storage.setItem("low", low);
            storage.setItem("icon", icon);
            storage.setItem("detailedForecast", detailedForecast);
        })
        .catch(error => console.log("There was a getForecast error: ", error))
}

buildPage();

// Populate the current location weather page
function buildPage() {
    //set Head section title
    let pageTitle = document.getElementById('pagetitle');
    let fullName = storage.getItem('locName') + ',' + storage.getItem('locState');
    let fullNameNode = document.createTextNode(fullName);
    //insert to page
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    document.getElementById('locName').innerHTML = fullName;
    //Wind Dial/speed/direction
    let gust = storage.getItem('windGust');
    document.getElementById('windgusts').innerHTML = gust;
    let windS = storage.getItem('windSpeed');
    document.getElementById('windx').innerHTML = windS;
    let windD = storage.getItem('windDirection');
    document.getElementById('direction').innerHTML = windD;
    windDial(windD);
    //Cur WEather Section
    let curW = storage.getItem('curWeather');
    let cond = getCondition(curW);
   // console.log('Curent Weather Condidtion is:');
   // console.log(getCondition(curW));
    changeSummaryImage(cond);

    //Temperatures

    let curtemp = storage.getItem('temperature');
    curtemp = Math.round((convertToFahrenheit(curtemp)));
    document.getElementById('current').innerHTML = curtemp + '&#176;' + 'F';

    let low = storage.getItem('low');
    document.getElementById('cold').innerHTML = low + '&#176;' + 'F';

    let high = storage.getItem('high');
    document.getElementById('hot').innerHTML = high + '&#176;' + 'F';


    //Meters to Feet 
    let eleva = storage.getItem('stationElevation');
    convertMeters(eleva);
    console.log('Converted Elevation is:')
    console.log(convertMeters(eleva));
    document.getElementById('elevation').innerHTML = convertMeters(eleva) + ' ft.';
    //Hourly temp
    let date = new Date();
    let nextHour = date.getHours() + 1;
    let hourlyStorage = storage.getItem('hourly');
    //split & converts to an array
    let hourlyData = hourlyStorage.split(",");
    console.log('Hourly Array');
    console.log(hourlyData);
    //send to hourly data
    scroll.innerHTML = buildHourlyData(nextHour, hourlyData);

    //coslog to make sure it workds
    console.log(buildHourlyData(nextHour, hourlyData));

    // Detailed Forecast
    let df = storage.getItem("detailedForecast");
    document.getElementById('weartherforecast').innerHTML = df

    //WindCHill
    let speed = storage.getItem('windSpeed');
    let ws = speed.charAt(0);
    document.getElementById("feelTemp").innerHTML = buildWC(ws, curtemp);

    //Latitude and Long
    let lat = storage.getItem('latitude');
    let long = storage.getItem('longitude');
    //sets up values for the directions
    let latC = '';
    let longC = '';
    //rounds the lat and long
    lat = Math.round(lat * 100) / 100;
    long = Math.round(long * 100) / 100;

    //get direction
    if (Math.sign(lat) == 1) {
        latC = "&deg;N, "
    } else {
        latC = '&deg;S '
    }
    if (Math.sign(long) == 1) {
        longC = '&deg;E '
    } else {
        longC = '&deg;W '
    }

    document.getElementById('latLon').innerHTML = lat + latC + ', ' + long + longC;

    //convert to F 
    let test = convertToFahrenheit(0);
    console.log('Fahrenheit converted is: ');
    console.log(test);

    // Convert to Fahrenheit
    function convertToFahrenheit(temperature) {
        let c = temperature;
        let f = (c * (9 / 5) + 32);
        return f;
    }
    pagecontent.setAttribute('class', ''); // removes the hide
    statusMessage.setAttribute('class', 'hide'); // hide the status
}