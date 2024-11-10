const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "London";

cities.forEach(city => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = '0';
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
}

function fetchWeatherData() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=7eb05a2f35bd185669d99350631491f0&units=metric`)
    .then(response => response.json())
    .then(data => {
        if (data.cod === "404") {
            alert('City not found, please try again');
            app.style.opacity = "1";
            return;
        }

        temp.innerHTML = data.main.temp + "&#176;";
        conditionOutput.innerHTML = data.weather[0].description;
        
        const date = new Date(data.dt * 1000);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = data.name;

        const iconId = data.weather[0].icon;
        icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;


        cloudOutput.innerHTML = data.clouds.all + "%";
        humidityOutput.innerHTML = data.main.humidity + "%";
        windOutput.innerHTML = data.wind.speed + "km/h";

        let timeOfDay = "day";
        if (date.getHours() < 6 || date.getHours() > 18) {
            timeOfDay = "night";
        }

        const code = data.weather[0].id;
        if (code === 800) {
            app.style.backgroundImage = `url('./clear-skie 2.png')`;
            btn.style.background = timeOfDay === "day" ? "#e5ba92" : "#181e27";
        } else if ([801, 802, 803, 804].includes(code)) {
            app.style.backgroundImage = `url('./thunder cloudy.png')`;
            btn.style.background = timeOfDay === "day" ? "#fa6d1b" : "#181e27";
        } else if (code >= 200 && code < 600) {
            app.style.backgroundImage = `url('./rain drps.jpg')`;
            btn.style.background = timeOfDay === "day" ? "#647d75" : "#325c80";
        } else if (code === 721) { 
            app.style.backgroundImage = `url('./hazyy.jpg')`;
            btn.style.background = timeOfDay === "day" ? "#d3c6a6" : "#665e57";
        } else if (code === 801) { 
            app.style.backgroundImage = `url('./broken clouds.jpg')`; 
            btn.style.background = timeOfDay === "day" ? "#fa6d1b" : "#181e27";
        }  else if (code >= 600 && code <= 622) { 
            app.style.backgroundImage = `url('./snow.jpg')`;
            btn.style.background = timeOfDay === "day" ? "#d4f3ef" : "#a1c3d1";
        } else if (code >= 701 && code <= 781) { 
            app.style.backgroundImage = `url('./fog 1.png')`;
            btn.style.background = timeOfDay === "day" ? "#b3c6cc" : "#4a5a6a";
        }  else {
            app.style.backgroundImage = `url('./night rain.jpg')`;
            btn.style.background = timeOfDay === "day" ? "#4d72aa" : "#1b1b1b";
        }

        app.style.opacity = "1";
    })
    .catch(() => {
        alert('An error occurred, please try again');
        app.style.opacity = "1";
    });
}

fetchWeatherData();
app.style.opacity = "1";
