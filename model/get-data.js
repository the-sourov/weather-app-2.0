// ⚓ ====================> third party modules
const axios = require(`axios`);

const apiKey = process.env.API_KEY;

// 💥 ====================> this module makes three api calls to the open weather service.
const getData = async (latitude, longitude) => {

    try {

        const apis = {
            reverseGeocodingApi : `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`,
            currentWeatherApi : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`,
            currentAirPollutionApi : `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
        };

        const reverseGeocodingResponse = axios.get(apis.reverseGeocodingApi);
        const currentWeatherResponse = axios.get(apis.currentWeatherApi);
        const currentAirPollutionResponse = axios.get(apis.currentAirPollutionApi);

        const response = await Promise.all([reverseGeocodingResponse, currentWeatherResponse, currentAirPollutionResponse]);

        const data = response.map(({data}, index) => {
            
            if(index === 0) {
                const {name} = data[0];
                return {name};

            } else if(index === 1) {
                const {description} = data.weather[0];
                const {temp, humidity} = data.main;
                const windSpeed = data.wind.speed;
                const clouds = data.clouds.all;
                return {temp, description, humidity, windSpeed, clouds};

            } else if(index === 2) {
                const {aqi} = data.list[0].main;

                switch(aqi) {
                    
                    case 1:
                        return {airQuality : `good`};
                    case 2:
                        return {airQuality : `fair`};
                    case 3:
                        return {airQuality : `moderate`};
                    case 4:
                        return {airQuality : `poor`};
                    case 5:
                        return {airQuality : `very poor`};
                };

            }
        });

        return {resolved : true, data,};

    } catch {
        return {resolved : false, data : null,};
    }
};

module.exports = getData;