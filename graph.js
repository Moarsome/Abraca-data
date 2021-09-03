function createWeatherChart(temperatureData, timeData)
{
    var ctx = document.getElementById('weatherChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [
                {
                label: 'Temperatures (°C)',
                data: temperatureData,
                backgroundColor: [
                    'rgb(255, 255, 255)'
                ],
                borderColor: [
                    'rgb(0, 40, 77)'
                ],
                borderWidth: 2
            },
        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

function createUsageChart(usageData, timeData)
{
    var ctx = document.getElementById('usageChart').getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [
                {
                label: 'Electricity Usage (kWh)',
                data: usageData,
                backgroundColor: [
                    'rgb(255, 255, 255)'
                ],
                borderColor: [
                    'rgb(230, 115, 0)'
                ],
                borderWidth: 2
            },
        ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}