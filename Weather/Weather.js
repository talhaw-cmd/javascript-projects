const apiKey = '0deb96e946msh32ac7e94a34ffe0p1fbfddjsnb6c4ca316cf4';
const loader = document.getElementById('loader');
const content = document.getElementById('content');

async function updateWeather(city) {
    try {
        // 1. Show Loader & Blur Content
        loader.style.display = 'block';
        content.classList.add('loading-blur');

        const res = await fetch(`https://weather-data-api1.p.rapidapi.com/check-forecast?q=${city}`, {
            headers: { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': 'weather-data-api1.p.rapidapi.com' }
        });
        const data = await res.json();
        const w = data.list[0];

        // 2. Update UI
        document.getElementById('cityTitle').innerText = city;
        document.getElementById('descTitle').innerText = w.weather[0].description;
        document.getElementById('tempVal').innerText = Math.round(w.main.temp - 273.15);
        document.getElementById('humVal').innerText = w.main.humidity + '%';
        document.getElementById('windVal').innerText = w.wind.speed + ' km/h';
        document.getElementById('feelVal').innerText = Math.round(w.main.feels_like - 273.15) + '°';
        document.getElementById('visVal').innerText = (w.visibility / 1000).toFixed(1) + ' km';

    } catch (e) {
        alert("City not found or API error!");
    }
    // 3. Hide Loader & Remove Blur
    loader.style.display = 'none';
    content.classList.remove('loading-blur');
}

document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        updateWeather(e.target.value);
        e.target.value = '';
    }
});

// Default Load
updateWeather('Karachi');