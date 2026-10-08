import "./App.css"

function App() {

  const apiKey = import.meta.env.VITE_API_KEY;

  async function getWeather() {

    const inputCityValue = document.getElementById("inputCity").value.toLowerCase()
    const cityName = document.getElementById("cityName")
    const weatherType = document.getElementById("weatherType")
    const weatherTypeDesc = document.getElementById("weatherTypeDesc")
    const temp = document.getElementById("temp")
    const tempFeeling = document.getElementById("tempFeeling")
    const windSpeed = document.getElementById("windSpeed")
    const errorElement = document.getElementById("errorElement")
    const weatherIcon = document.getElementById("weatherIcon")
    const cardElement = document.getElementById("card")
    
    {/* Use Geocode Api to convert city name to coordinates */}
    const geocodeResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputCityValue}&limit=1&appid=${apiKey}`)
    const geocodeData = await geocodeResponse.json()

    if (!geocodeResponse.ok || geocodeData.length === 0) {
      errorElement.classList.replace("hiddenElement", "errorElement")
      return
    }
    if (geocodeResponse.ok) {
      errorElement.classList.add("hiddenElement")
    }

    const lat = geocodeData[0].lat
    const lon = geocodeData[0].lon
    
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const weatherData = await weatherResponse.json()

    const iconCode = weatherData.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    if (!weatherResponse.ok) {
      errorElement.textContent = `An error occured. Status: ${weatherResponse.status}`
      errorElement.classList.replace("hiddenElement", "errorElement")
      return
    }
    if (weatherResponse.ok) {
      errorElement.classList.add("hiddenElement")
    }

    document.getElementById("weatherInfo").classList.remove("hiddenElement")
    weatherIcon.classList.remove("hiddenElement") 

    function showWeatherData() {
      cityName.textContent = `${weatherData.name}`
      weatherType.textContent = `${weatherData.weather[0].main}`
      weatherTypeDesc.textContent = `${weatherData.weather[0].description}`
      temp.textContent = `${Math.trunc(weatherData.main.temp)}\u00B0`
      tempFeeling.textContent = `Feels like ${Math.trunc(weatherData.main.feels_like)}\u00B0`
      windSpeed.textContent = `${Math.trunc(weatherData.wind.speed)} km/h`
      weatherIcon.src = iconUrl
    }

    const hour = new Date().getHours()

    if (hour <= 8 || hour > 19) {
      cardElement.classList.replace("card", "cardNight")
      document.getElementById("btn").classList.replace("btn", "btnNight")
    }

    showWeatherData()
  }

  return (
        <div className="container"> 
          <div className="form">
            <p className="hiddenElement" id="errorElement">An error occured. Please enter a valid city name</p>
            <input type="text" placeholder="Enter city name" id="inputCity"/>
            <button className="btn" type="submit" onClick={getWeather} id="btn">Get Weather</button>
          </div>
          <div className="hiddenElement" id="weatherInfo">
            <div className="card" id="card">
              <h1 id="cityName">City</h1>
              <p id="weatherType">Weather</p>
              <p className="weatherDesc" id="weatherTypeDesc">Weather Description</p>
              <img src="" alt="weather icon" id="weatherIcon" className="hiddenElement" />
              <p id="temp">Temperature</p>
              <p className="weatherDesc" id="tempFeeling">Temperature feeling</p>
              <p id="windSpeed">Wind Speed</p>
            </div>
          </div>
        </div>
  )
}

export default App
