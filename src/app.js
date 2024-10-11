import { getWeatherData } from './components/weather.js';
import { getCryptoRates } from './components/crypto.js';
import { getNewsData } from './components/news.js';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch weather data
    getWeatherData();

    // Fetch cryptocurrency data
    getCryptoRates();

    // Fetch news data
    getNewsData();
});
