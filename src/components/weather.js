export async function getWeatherData() {
    const latitude = 34.1722;  // North Hollywood, CA
    const longitude = -118.3787; // North Hollywood, CA
    const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civil&output=json`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        const data = await response.json();

        //Extract forecast data (temperature, precipitation, wind)

        const weatherContent = document.getElementById('weather-content');
        const forecast = data.dataseries[0]; 
        
        weatherContent.innerHTML = `
            <p>Temperature: ${forecast.temp2m}°C</p>
            <p>Weather: ${getWeatherDescription(forecast.weather)}</p>
            <p>Wind: ${forecast.wind10m.direction}, Speed: ${forecast.wind10m.speed} m/s</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-content').innerHTML = '<p>Error loading weather data.</p>';
    }
}

function getWeatherDescription(weatherCode) {
    const weatherTypes = {
        clear: 'Clear',
        cloudy: 'Cloudy',
        rain: 'Rain',
        snow: 'Snow',
        ts: 'Thunderstorm',
        fog: 'Fog',
    };
    return weatherTypes[weatherCode] || 'Sunny';
}
