

  const apiKey = "cf73d38d029b5b594a52f8399a2f992f";

  function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Please enter a city name.");

    const url = `https://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then(data => {
        const display = document.getElementById("weatherDisplay");
        const temp = data.main.temp;

        let iconUrl = "";
        if (temp >= 30) {
          iconUrl = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun
        } else if (temp >= 25) {
          iconUrl = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // Cloud
        } else if (temp > 17 && temp < 25) {
          iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Rain
        } else {
          iconUrl = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // Snow
        }

        display.innerHTML = `
          <h2><i class="fas fa-map-pin" style="color:#d11a1a"></i> ${data.name}, ${data.sys.country}</h2>
          <p class="desc">${data.weather[0].description}</p>
          <img src="${iconUrl}" alt="Weather icon">
          <div class="temperature">${temp}&deg;C</div>
          <p class="feels-like">Feels like ${data.main.feels_like}&deg;C</p>
          <div class="weather-grid">
            <div class="weather-box" style="background:#e0f7fa;color:#00796b">
              <i class="fas fa-tint" style="color:#00796b;"></i> Humidity<br><b>${data.main.humidity}%</b>
            </div>
            <div class="weather-box" style="background:#fff3e0;color:#e65100">
              <i class="fas fa-wind" style="color:#e65100;"></i> Wind Speed<br><b>${data.wind.speed} m/s</b>
            </div>
            <div class="weather-box" style="background:#e8f5e9;color:#388e3c">
              <i class="fas fa-thermometer-three-quarters" style="color:#388e3c;"></i> Pressure<br><b>${data.main.pressure} hPa</b>
            </div>
            <div class="weather-box" style="background:#f3e5f5;color:#6a1b9a">
              <i class="fas fa-eye" style="color:#6a1b9a;"></i> Visibility<br><b>${(data.visibility / 1000).toFixed(1)} km</b>
            </div>
          </div>
          <p style="margin-top:15px;font-size:14px;color:#666;">Condition: ${data.weather[0].main}</p>
        `;
        display.style.display = "block";
      })
      .catch(error => {
        alert(error.message);
      });
  }