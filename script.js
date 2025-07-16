document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const cityInput = document.getElementById("cityInput");
  const weatherCard = document.getElementById("weatherResult");

  const API_KEY = "2de96636726b4ad29f9121011251607"; // Replace this

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
      weatherCard.innerHTML = "<p>Please enter a city name.</p>";
      weatherCard.style.display = "block";
      return;
    }

    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        const weatherHtml = `
          <h3>${data.location.name}, ${data.location.country}</h3>
          <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
          <p><strong>Condition:</strong> ${data.current.condition.text}</p>
          <img src="${data.current.condition.icon}" alt="weather icon">
          <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        `;
        weatherCard.innerHTML = weatherHtml;
        weatherCard.style.display = "block";
      })
      .catch((error) => {
        weatherCard.innerHTML = `<p>${error.message}</p>`;
        weatherCard.style.display = "block";
      });
  });
});
