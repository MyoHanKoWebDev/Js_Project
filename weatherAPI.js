const weatherForm = document.querySelector(".weatherform");
const input = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "14c1985ce155a4e8233825797a51bde2";

weatherForm.addEventListener('submit', async event => {
    event.preventDefault(); //to prevent from default loading form

    const city = input.value;
    console.log(city);
    if (city) {
        try {
            const weaData = await getWeaData(city);
            disWeaInfo(weaData);
        } catch (error) {
            console.log(error);
            disEr(error);
        }
    } else {
        disEr("Please Enter A City!")
    }
});

async function getWeaData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    //testing for unormal city name
    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function disWeaInfo(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDis = document.createElement("h1");
    cityDis.textContent = city;
    cityDis.classList.add("city")
    card.appendChild(cityDis);

    const tempDis = document.createElement("p");
    tempDis.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`;
    tempDis.classList.add("temp")
    card.append(tempDis);

    const humidDis = document.createElement("p");
    humidDis.textContent = humidity;
    humidDis.classList.add("desc")
    card.append(humidDis);

    const descDis = document.createElement("p");
    descDis.textContent = description;
    descDis.classList.add("desc")
    card.append(descDis);

    const emoDis = document.createElement("p");
    emoDis.textContent = getWeaEmo(id);
    emoDis.classList.add("emoji")
    card.append(emoDis);
}

function getWeaEmo(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌀";
        case (weatherId == 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function disEr(message) {
    const erDis = document.createElement("p");
    erDis.textContent = message;
    erDis.classList.add("erDis")
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(erDis);
}