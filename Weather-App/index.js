const apiKey = 'd9dce681c1be4bee93f93919241708'; // Replace with your WeatherAPI key

document.getElementById('fetchWeatherBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
        getWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

function getWeatherData(location) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert("Error fetching weather data. Please try again.");
        });
}

function displayWeatherData(data) {
    if (data.error) {
        alert("Location not found. Please try again.");
        return;
    }

    document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('conditions').textContent = `Conditions: ${data.current.condition.text}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.current.wind_kph} kph`;
}
