// 0d10d4e8cfe25324a8acdfd7647f3fd9
const apiKey = '0d10d4e8cfe25324a8acdfd7647f3fd9';
const apiCountryURL = 'https://flagsapi.com/BR/flat/64.png';
// const apiUnsplash = 'https://source.unsplash.com/1600x900/?';
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const weatherData = document.querySelector('#weather-data');
const cityElement = document.querySelector('#city');
const tempElementSpan = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElementSpan = document.querySelector('#umidity span');
const windElementSpan = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');
const errorMessageContainer = document.querySelector('#error-message');
const loader = document.querySelector('#loader');
const suggestions = document.querySelector('#suggestions');
const suggestionsButtons = document.querySelectorAll('.btn');



const toggleLoader = () => {
    loader.classList.toggle('hide');
}

const getWeatherData = async(city) => {
    toggleLoader();

    const apiWeatherURL = 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

const showErrorMessage = () => {
    errorMessageContainer.classList.remove('hide');
};

const hide = () => {
    weatherContainer.classList.add('hide');
    
}


const showWeatherData = async (city) => {
   
    
    const data = await getWeatherData(city);
    
    if(data.cod === '404') {
        console.log('teste');
        hide();
        showErrorMessage();
        return;
   }

   cityElement.textContent = data.name;
   tempElementSpan.textContent = parseInt(data.main.temp);
   descElement.textContent = data.weather[0].description;
   weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
   countryElement.src = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
   umidityElementSpan.textContent = data.main.humidity + '%';
   windElementSpan.textContent = parseInt(data.wind.speed) + 'km/h';
//    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
//    document.body.style.backgroundRepeat = 'no-repeat';
//    document.body.style.backgroundSize = 'cover';
//    document.body.style.backgroundPosition = 'center';

   weatherData.classList.remove('hide');
   errorMessageContainer.classList.add('hide');
   suggestions.classList.add('hide');
   suggestionsButtons.forEach((btn) => {
    btn.classList.add('hide');
    });

};



searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;
    


    showWeatherData(city);
});

cityInput.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        const city = e.target.value;
       

        showWeatherData(city);
    }
});

suggestionsButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute('id');

        showWeatherData(city);
    });
});

