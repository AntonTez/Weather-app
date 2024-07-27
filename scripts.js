const paramApi = {
	url: 'https://api.openweathermap.org/data/2.5/',
	appid: '684a489e1727e4a16d87c03ddd312c06',
};

const cities = [
	{
		cityName: 'Chicago',
		cityId: 4887398,
	},
	{
		cityName: 'New York',
		cityId: 5128581,
	},
	{
		cityName: 'San Francisco',
		cityId: 5391959,
	},
	{
		cityName: 'Kyiv',
		cityId: 703448,
	},
];

createSelect(cities);
getWeather();
document.querySelector('#city').onchange = getWeather;

function createSelect(cities) {
	const parentElement = document.querySelector('.weather-app');
	const mainInfoElement = document.querySelector('.app__main-info');

	if (parentElement && mainInfoElement) {
		const selectElement = document.createElement('select');

		selectElement.className = 'app__select';
		selectElement.id = 'city';

		cities.forEach((city) => {
			const option = document.createElement('option');

			option.value = city.cityId;
			option.text = city.cityName;
			selectElement.appendChild(option);
		});

		parentElement.insertBefore(selectElement, mainInfoElement);
	}
}

function getWeather() {
	const cityId = document.querySelector('#city').value;

	if (cityId) {
		fetch(
			`${paramApi.url}weather?id=${cityId}&units=metric&appid=${paramApi.appid}`
		)
			.then((weather) => {
				return weather.json();
			})
			.then(showWeather);
	}
}

function showWeather(data) {
	const cityNameEl = document.querySelector('#city-name');
	const temperatureEl = document.querySelector('#temperature');
	const statusEl = document.querySelector('#status');
	const weatherIconEl = document.querySelector('#weather-icon');
	const directionOfTheWindEl = document.querySelector('#direction-of-the-wind');
	const windSpeedEl = document.querySelector('#wind-speed');
	const pressureEl = document.querySelector('#pressure');

	if (cityNameEl) cityNameEl.textContent = data.name;
	if (temperatureEl) temperatureEl.innerHTML = `${data.main.temp}&deg`;
	if (statusEl) statusEl.textContent = data.weather[0].description;
	if (weatherIconEl)
		weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	if (directionOfTheWindEl) directionOfTheWindEl.textContent = data.wind.deg;
	if (windSpeedEl) windSpeedEl.textContent = data.wind.speed;
	if (pressureEl) pressureEl.textContent = data.main.pressure;
}
