const localization = document.querySelector('.localization');
const pm10Info = document.querySelector('.pm10-result');
const pm25Info = document.querySelector('.pm25-result');
const o3Info = document.querySelector('.o3-result');
const myPromise = fetch('https://api.waqi.info/feed/here/?token=bec1f2834d0747c3fad4a5968e913404e4b1d0df');
const results = document.querySelectorAll('.result')

function airQualityPm25(num) {
	if (num <= 20) {
		console.log('good')
		return true;
	} else {
		console.log('bad');
		return false;
	}
}

function airQualityPm10(num) {
	if (num <= 35) {
		console.log('good');
		return true;
	} else {
		console.log('bad')
		return false;
	}
}

function generalAirQuality(pm10, pm25) {
	if (pm10 && pm25) {
		console.log('good air')
	} else {
		console.log('bad air')
	}
}

myPromise.then(response => response.json())
		.then(response => {
			console.log(response)
			const city = response.data.city.name
			localization.textContent = city.split("-")[0];
		
			results.forEach(result => {
				const info = result.dataset.name;
				const infoValue = response.data.iaqi[info];
				result.textContent = infoValue.v;
			})
			
			let pm10Info = airQualityPm10(response.data.iaqi.pm10.v);
			let pm25Info = airQualityPm25(response.data.iaqi.pm25.v);
			generalAirQuality(pm10Info, pm25Info);
		})
		.catch(err => console.error(err));
