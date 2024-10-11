export async function getCryptoRates() {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch cryptocurrency data');
        const data = await response.json();

        const cryptoContent = document.getElementById('crypto-content');
        cryptoContent.innerHTML = `
            <p>Bitcoin: $${data.bitcoin.usd}</p>
            <p>Ethereum: $${data.ethereum.usd}</p>
        `;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        document.getElementById('crypto-content').innerHTML = '<p>Error loading cryptocurrency data.</p>';
    }
}
