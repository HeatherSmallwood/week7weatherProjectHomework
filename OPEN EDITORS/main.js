document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'e4dd4e3c19c37c38ca18e9b66fb051fe';
    let ZIP_CODE = ''; 
    const UNITS = 'imperial';

    const weatherInfo = {
        highTemp: document.getElementById('highTemp'),
        lowTemp: document.getElementById('lowTemp'),
        forecast: document.getElementById('forecast'),
        humidity: document.getElementById('humidity')
    };

    const zipCodeInput = document.getElementById('zipCode');
    const submitButton = document.getElementById('submitZip');

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${ZIP_CODE}&units=${UNITS}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Weather data could not be found');
            }
            const data = await response.json();

            weatherInfo.highTemp.innerText = data.main.temp_max.toFixed(1);
            weatherInfo.lowTemp.innerText = data.main.temp_min.toFixed(1);
            weatherInfo.forecast.innerText = data.weather[0].description;
            weatherInfo.humidity.innerText = data.main.humidity;

            
            document.querySelector('.weather-info').style.display = 'block';
        } catch (error) {
            console.error('Error:', error.message);
            alert('Could not get the weather data!');
        }
    };

    submitButton.addEventListener('click', () => {
        ZIP_CODE = zipCodeInput.value.trim();
        if (ZIP_CODE) {
            fetchWeatherData();
        } else {
            alert('Please enter a valid ZIP code.');
        }
    });
});


