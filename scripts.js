const paramApi = {
	'url' : 'https://api.openweathermap.org/data/2.5/',
	'appid' : '684a489e1727e4a16d87c03ddd312c06'
}

const cities = [
	{
		cityName: 'Chicago',
		cityId: 4887398
	},
	{
		cityName: 'New York',
		cityId: 5128581
	},
	{
		cityName: 'San Francisco',
		cityId: 5391959
	},
	{
		cityName: 'Kyiv',
		cityId: 703448
	}
];

createSelect(cities);
getWeather(); 
document.querySelector('#city').onchange = getWeather;

function createSelect (cities) {
	const parentElement = document.querySelector('.weather-app');
	const firstChildElement = parentElement.firstChild;
	const selectElement = document.createElement('select');
	
	selectElement.id = 'city';

	for (let i = 0; i < cities.length; i++) {
		const option = document.createElement('option');

		option.value = cities[i].cityId;
		option.text = cities[i].cityName;
		selectElement.appendChild(option);
	}

	parentElement.insertBefore(selectElement, firstChildElement);
}

function getWeather() {
    const cityId = document.querySelector('#city').value;

    fetch(`${paramApi.url}weather?id=${cityId}&units=metric&appid=${paramApi.appid}`)
	.then(weather => {
			return weather.json();
		}).then(showWeather);
}

function showWeather(data) {
	// console.log(data);
	// const weatherParams = ["city-name", "temperature", "weather-icon", "description", "direction-of-the-wind", "wind-speed", "pressure"]

	document.querySelector('#city-name').innerHTML = `<p>${data.name}</p>`;
    document.querySelector('#temperature').innerHTML = `<p>${data.main.temp}&deg</p>`;
	document.querySelector('#weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon">`;
	document.querySelector('#description').innerHTML = `<p>${data.weather[0].description}</p>`;
	document.querySelector('#direction-of-the-wind').innerHTML = `<p>Direction of the wind <br> ${data.wind.deg}</p>`;
	document.querySelector('#wind-speed').innerHTML = `<p>Wind speed <br> ${data.wind.speed}</p>`;
	document.querySelector('#pressure').innerHTML = `<p>Pressure <br> ${data.main.pressure}</p>`;
}