document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.row');
  
    // Fetch countries data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                // Create card element
                const card = document.createElement('div');
                card.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';
                card.innerHTML = `
                    <div class="card h-100">
                        <div class="card-header">
                            ${country.name.common}
                        </div>
                        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="card-img-top">
                        <div class="card-body">
                            <div class="card-text">
                                Name: ${country.name.common}<br>
                                Region: ${country.region}<br>
                                Capital: ${country.capital ? country.capital[0] : 'N/A'}<br>
                                Country codes: ${country.cca2}, ${country.cca3}, ${country.ccn3}<br>
                                Latlng: ${country.latlng.join(', ')}
                                <button class="btn btn-primary mt-2 weather-btn" data-lat="${country.latlng[0]}" data-lng="${country.latlng[1]}">Click for Weather</button>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
  
            // Add event listeners to weather buttons
            document.querySelectorAll('.weather-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const lat = event.target.getAttribute('data-lat');
                    const lng = event.target.getAttribute('data-lng');
                    fetchWeather(lat, lng);
                });
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
  });
  
  // Function to fetch weather data from OpenWeatherMap API
  function fetchWeather(lat, lng) {
    const apiKey = '501f694bfe71ede2b81fa70cb30a1717';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=501f694bfe71ede2b81fa70cb30a1717`;
  
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                Temperature: ${data.main.temp} °C
                Weather: ${data.weather[0].description}
                Humidity: ${data.main.humidity} %
            `;
            // Display weather info in a prompt
            alert(`Weather Information:\n\n${weatherInfo}`);
        })
        .catch(error => console.error('Error fetching weather data:', error));
  }
  