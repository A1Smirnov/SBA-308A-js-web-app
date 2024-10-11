import { getWeatherData } from './components/weather.js';
import { getCryptoRates } from './components/crypto.js';
import { getNewsData, loadPreferences, savePreferences } from './components/news.js';

document.addEventListener('DOMContentLoaded', () => {
    // Fetch weather data
    getWeatherData();

    // Fetch cryptocurrency data
    getCryptoRates();

    // Fetch news data
    getNewsData();
});


//////////////////////////////////////



// Loading localStorage
document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();

    // Eventlistener for Search
    document.getElementById('search-button').addEventListener('click', () => {
        const searchQuery = document.getElementById('search-input').value;
        getNewsData('general', searchQuery);
    });

    // Eventlistener for Category
    document.getElementById('category-select').addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        savePreferences(selectedCategory);
        getNewsData(selectedCategory);
    });
});

