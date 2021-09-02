let temperatureData = [];
let timeData = [];

function parseWeather(jsonWeather) {
    let hourIntervals = jsonWeather["hourly"];
    let maxTemp = hourIntervals[0];
    let minTemp = hourIntervals[0];
    var running = true;

    for (let hourInterval of hourIntervals) {
        if (running == true)
        {
            // Find maximum temperature
            if (parseFloat(hourInterval["temp"]) > parseFloat(maxTemp["temp"])) {
                maxTemp = hourInterval;
            }
            // Find minimum temperature
            if (parseFloat(hourInterval["temp"]) < parseFloat(minTemp["temp"])) {
                minTemp = hourInterval;
            }

            var currentHour = getHour(hourInterval["dt"]);
            if (currentHour >= 12)
            {
                if (currentHour != 12)
                {
                    currentHour -= 12;
                }
                currentHour += ":00 PM";
            }
            else
            {
                currentHour += ":00 AM";
            }

            // Add temperature data to array
            temperatureData.push(hourInterval["temp"]);
            timeData.push(currentHour);
            if (getHour(hourInterval["dt"]) == "0")
            {
                running = false;
            }
        }
    }

    // Get time of min/max temperatures and print
    let maxHour = getHour(maxTemp["dt"]);
    let minHour = getHour(minTemp["dt"]);

    alert("Max temperature: " + maxTemp["temp"] + "°C at time: " + maxHour + ":00");
    alert("Min temperature: " + minTemp["temp"] + "°C at time: " + minHour + ":00");
}

function parseHop(jsonHop, jsonConsumption, previousDate) {
    // Get user intervals object
    let userIntervals = jsonConsumption["data"]["usage"][previousDate]["intervals"];
    // Get hop intervals
    let intervals = jsonHop["data"]["intervals"];

    // Variable for highest consumption and current interval
    let maxConsumption = userIntervals[1];
    let interval = 1;

    // Loop through user intervals to find highest consumption
    for (interval in userIntervals) {
        // Comparing highest interval with current interval values (in float values)
        if (parseFloat(userIntervals[interval]["consumption"]) > parseFloat(maxConsumption["consumption"])) {
            // Ensure that this interval is off-peak
            if (intervals[interval]["active"] == "1") {
                maxConsumption = userIntervals[interval];
            }
        }
    }

    // Print highest off-peak power usage 
    alert("max interval: " + maxConsumption["consumption"] + " at " + maxConsumption["time"]);
    // return "max interval" + maxConsumption["consumption"] + " at " + maxConsumption["time"];
}

function getTempData()
{
    return temperatureData;
}

function getTimeData()
{
    return timeData;
}