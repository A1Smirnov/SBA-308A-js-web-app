export async function getNewsData() {
    const apiKey = '03b10503f0f54fa8a38e581518bae95f'; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch news data');
        const data = await response.json();

        const newsContent = document.getElementById('news-content');
        newsContent.innerHTML = data.articles.slice(0, 5).map(article => `
            <div class="news-item">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching news data:', error);
        document.getElementById('news-content').innerHTML = '<p>Error loading news data.</p>';
    }
}
