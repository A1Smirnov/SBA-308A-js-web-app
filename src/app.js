import { getWeatherData } from './components/weather.js';
import { getCryptoRates } from './components/crypto.js';
import { getNewsData, loadPreferences, savePreferences } from './components/news.js';

document.addEventListener('DOMContentLoaded', () => {
    // Load data
    Promise.all([
        getWeatherData(),
        getCryptoRates(),
        getNewsData(),
    ]).catch(error => console.error('Error loading data:', error));

    // Load preferences
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

