let temperatureData = [];
let timeData = [];
let estimatedInterval;
let hourAverages = [];
let dateTimeline = [];

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

    // alert("Max temperature: " + maxTemp["temp"] + "°C at time: " + maxHour + ":00");
    // alert("Min temperature: " + minTemp["temp"] + "°C at time: " + minHour + ":00");
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
    for (interval in userIntervals) 
    {
        //console.log(userIntervals[interval]["consumption"] +" at "+userIntervals[interval]["time"]+", offpeak: "+intervals[interval]["active"]);
        // Comparing highest interval with current interval values (in float values)
        if (parseFloat(userIntervals[interval]["consumption"]) > parseFloat(maxConsumption["consumption"])) 
        {
            // Ensure that this interval is off-peak
            if (intervals[interval]["active"] == "1") 
            {
                maxConsumption = userIntervals[interval];
                estimatedInterval = interval;
            }
        }
    }

    
    
    // Loop through dates
    let date;
    for (date in jsonConsumption["data"]["usage"])
    {
        hourAverages.push(jsonConsumption["data"]["usage"][date]["intervals"][estimatedInterval]["consumption"]);
        dateTimeline.push(date);
    }
    // Add 1 hour to current hour (for presentation purposes)
    var hour = parseInt(maxConsumption["time"].substring(0,maxConsumption["time"].indexOf(":"))) + 1;

    // Print highest off-peak power usage 
    return maxConsumption["time"]+" - "+hour+maxConsumption["time"].substring(maxConsumption["time"].indexOf(":"));
}

function getTempData()
{
    return temperatureData;
}

function getTimeData()
{
    return timeData;
}

function getEstimatedInterval()
{
    return estimatedInterval;
}

function getHourAverages()
{
    return hourAverages;
}

function getDateTimeline()
{
    return dateTimeline;
}