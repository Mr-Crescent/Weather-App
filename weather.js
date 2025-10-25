const apiKey = "1da8578388296ad4ca18d6283832ebe3"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const cityValue = document.querySelector(".city-name")
const btn = document.querySelector(".searchBtn")
const weatherIcon = document.querySelector(".main-img")

function resetToDefault() {
    document.querySelector(".city").innerHTML = "City Name";
    document.querySelector(".temp").innerHTML = "0°C";
    document.querySelector(".humidity-value").innerHTML = "0 %";
    document.querySelector(".speed-value").innerHTML = "0 km/h";
    weatherIcon.src = "./images/clouds.png";
}

async function checkWeather(city){

    try {
        if(!city.trim()) {
            resetToDefault();
            return;
        }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
     if (!response.ok) {
        resetToDefault();
        return; 
    }
    
    var data = await response.json()

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity-value").innerHTML = data.main.humidity + " " + "%";
    document.querySelector(".speed-value").innerHTML = data.wind.speed + " " + "km/h";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "./images/clouds.png"
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./images/clear.png"
    } else if(data.weather[0].main == "Rain") {
        weatherIcon.src = "./images/rain.png"
    } else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./images/drizzle.png"
    } else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "./images/mist.png"
    }

    } catch (error) {
        console.error(error);
        resetToDefault();
    }
}

btn.addEventListener("click", ()=> {
    checkWeather(cityValue.value)
})

