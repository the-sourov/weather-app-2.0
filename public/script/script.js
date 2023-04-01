const elements = {
    loadingScreen : document.querySelector(`.loading-screen`),
    containers : document.querySelectorAll(`.container`),
    location : document.querySelector(`#location`),
    temp : document.querySelector(`#temp`),
    description : document.querySelector(`#description`),
    humidity : document.querySelector(`#humidity`),
    windSpeed : document.querySelector(`#wind-speed`),
    clouds : document.querySelector(`#clouds`),
    airQuality : document.querySelector(`#air-quality`),
};

// 💥 ====================> there are three possible ways to update the dom in this web application
// 1️⃣ ====================> if everything goes right event === 200;
// 2️⃣ ====================> if anything goes wrong. event === 500;
// 3️⃣ ====================> if user decline the access
const updateDOM = (event, data) => {

    if(event === `access denied` || event === `500`) {
        
        const headingPrimary = document.createElement(`h1`);
        headingPrimary.classList.add(`heading-primary`);
        headingPrimary.textContent = data;
        elements.loadingScreen.innerHTML = ``;
        elements.loadingScreen.appendChild(headingPrimary);

    } else if(event === `200`) {

        const {name} = data[0];
        const {temp, description, humidity, windSpeed, clouds} = data[1];
        const {airQuality} = data[2];

        elements.location.textContent = `📍 ${name}`;
        elements.temp.textContent = `${temp}°c`;
        elements.description.textContent = description;
        elements.humidity.textContent = `${humidity}%`;
        elements.windSpeed.textContent = `${windSpeed}km/h`;
        elements.clouds.textContent = `${clouds}%`;
        elements.airQuality.textContent = airQuality;
        elements.loadingScreen.classList.add(`loading-screen--hide`);
        elements.containers.forEach( value => {value.classList.remove(`container--hide`)});
    }
};

// 🌎 ====================> this function makes an http request to get the weather update
const getData = async (latitude, longitude) => {

    const response = await fetch(`/`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({latitude, longitude}),
    });
    const data = await response.json();
    const {status} = response;

    return status === 200 ? {resolved : true, data} : {resolved : false, data : null};

};

// 🍕 ====================> callback! if the user grant location access
const accessGranted = async ({coords}) => {

    const {latitude, longitude} = coords;
    const response = await getData(latitude, longitude);
    const {resolved, data} = response;

    !resolved ? updateDOM(`500`, `opps, please try again later 💥`) : updateDOM(`200`, data);
}

// 🍕 ====================> callback! if the user denied location access
const accessDenied = () => {
    updateDOM(`access denied`, `kindly allow the location access 🐸`);
};

// 📍 ====================> asking for client location
navigator.geolocation.getCurrentPosition(accessGranted, accessDenied);